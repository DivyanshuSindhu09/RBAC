import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body
    
        if(!username || !email || !password) {
            return res.status(401).json({
                success : false,
                message : "All fields are required"
            })
        }
        
        //! findOne ek document return krta hai and find ek array
        const existingUser = await User.findOne({
            $or : [
                {username}, {email}
            ]
        })
        //!$or ek logical operator hai jo bolta hai:
        //!"agar inme se koi bhi condition match karti hai toh document return karo."

        if(existingUser) { 
            return res.status(400).json({
                success : false,
                message : "User with this username or email already exists"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = await User.create({
            username,
            password : hashedPassword,
            email,
            role
        })
    
        return res.status(200).json({
            success : true,
            message : "User registered successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : "Something went wrong while registering the user",
            success : false
        })
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body
    
        if(!username || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }
    
        const user = await User.findOne({username})
    
        if(!user){
            return res.status(404).json({
                success : false,
                message : "Invalid credentials"
            })
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        console.log(isPasswordCorrect)
    
        if(!isPasswordCorrect){
        return res.status(401).json({
                success : false,
                message : "Invalid credentials"
            })   
            
        }
    
        //! token generation k lie -> payload, jwt secret, expiry
        const token = jsonwebtoken.sign({
            id : user._id,
            role : user.role,
            email : user.email
        }, process.env.JWT_SECRET,{
            expiresIn : "1h"
        })
    
        return res.status(200).json({
            success : true,
            token,
            message : "User Logged In successfully"
        })
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : error?.message
        })
    }

}
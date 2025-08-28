import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"

export const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body
    
        if(!username || !email || !password) {
            return res.status(200).json({
                success : false,
                message : "All fields are required"
            })
        }
        
        const existingUser = await User.find ({username})

        if(existingUser) { 
            return res.status(400).json({
                success : false,
                message : "User with this username already exists"
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
        res.status(400).json({
            message : "Something went wrong while registering the user",
            success : false
        })
    }
}
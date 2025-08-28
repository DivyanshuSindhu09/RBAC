import express from "express"
import { adminOnly, login, register, studentOnly, teacherOnly } from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/authMiddleware.js"

const userRouter = express.Router()

userRouter.post("/register" , register)
userRouter.post("/login" , login)
userRouter.get("/admin", verifyToken, adminOnly)
userRouter.get("/teacher", verifyToken, teacherOnly)
userRouter.get("/student", verifyToken, studentOnly)

export default userRouter

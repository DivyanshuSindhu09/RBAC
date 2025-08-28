import express from "express"
import { adminOnly, login, register, studentOnly, teacherOnly } from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
import { authorizeRoles } from "../middlewares/rolesMiddleware.js"

const userRouter = express.Router()

userRouter.post("/register" , register)
userRouter.post("/login" , login)
userRouter.get("/admin", verifyToken, authorizeRoles("admin"),adminOnly)
userRouter.get("/teacher", verifyToken, authorizeRoles("admin", "teacher"),teacherOnly)
userRouter.get("/student", verifyToken, authorizeRoles("admin", "teacher", "student"),studentOnly)

export default userRouter

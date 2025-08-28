import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/database.js"
import userRouter from "./routes/user.routes.js"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 7000

await dbConnect()

app.use("/api/v1/user", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
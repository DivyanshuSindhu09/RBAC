import express from "express"
import dotenv from "dotenv"
import dbConnect from "./config/database.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 7000

await dbConnect()

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
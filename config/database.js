import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const dbInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`DB CONNECTED BY ${dbInstance.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    //!We use process.exit(1) during DB connection failure to fail fast, avoid half-alive servers, and let process managers restart the app automatically.
    }
}

export default dbConnect
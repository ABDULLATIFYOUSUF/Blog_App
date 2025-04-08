import mongoose from 'mongoose'
import dotenv from "dotenv";

dotenv.config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connected to MongoDB DataBase ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connect Error ${error}`)
    }
}

export default connectDB;
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error:", error.message);
    }
}
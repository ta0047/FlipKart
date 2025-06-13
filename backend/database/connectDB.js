import mongoose from 'mongoose';
export const connectDB=async () => {
    try {
        await mongoose.connect("",()=>{
            console.log("Connected to MongoDB");
        })
    }
    catch{
        console.log("Error connecting to MongoDB");
    }
    
}
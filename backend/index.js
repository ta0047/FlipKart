import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { connectDB } from './database/connectDB.js';
import { errorMiddleware } from './Middlewares/ErrorsMiddlewares.js';
dotenv.config()
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true

}))
app.use(express.json())
app.use(cookieParser())
app.use(urlencoded({extended:true}))

connectDB();

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})
app.use(errorMiddleware)
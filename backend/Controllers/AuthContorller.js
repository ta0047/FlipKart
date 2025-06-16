import ErrorHandler from "../Middlewares/ErrorsMiddlewares.js";
import { catchAsyncError } from "../Middlewares/CatchAsyncError.js";
import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { send } from "process";

export const register = catchAsyncError(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new ErrorHandler("Please provide all fields", 400));
        }
        const existingUser = await User.findOne({ email, accountVerified: true });
        if (existingUser) {
            return next(new ErrorHandler("User already exists", 400));
        }
        const registerAttempt =await User.fine({
            email,
            accountVerified: false
        });
        
        if( registerAttempt.length >= 3) {
            return next(new ErrorHandler("Number of Attempts exhausted Contact Support ", 400));
        }

        if(password.length < 6 || password.length > 16) {
            return next(new ErrorHandler("Password must be between 6 and 16 characters", 400));
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedpassword,
        });
        const verificationCode = await user.generateVerificationCode();
        await user.save();
        sendVerificationCode(email, verificationCode, res);
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500));
    }

});


import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Exclude password from queries by default
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    accountVerified: {
        type: Boolean,
        default: false,
    },
    booksBorrowed: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BorrowedBook',

        },
        ruturnd: {
            type: Boolean,
            default: false,
        },
        bookTitle: String,
        borrowDate: Date,
        dueDate: Date,
    }],
    avatar: {
        public_id: String,
        url: String
    },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });
userSchema.methods.generateVerificationToken = function () {
    function generateRandom5DigitCode() {
        const firstDigit = Math.floor(Math.random() * 9) + 1; 
        const remainingDigits = Math.floor(Math.random() * 1000).toString().padStart(4, '0'); 

        return parseInt(firstDigit + remainingDigits); 
    }
        this.verificationCode = verificationCode
        this.verificationCodeExpire = Date.now()+5 * 60 * 1000; // 5 minutes
        return verificationCode;

}

export const User= mongoose.model('User', userSchema);

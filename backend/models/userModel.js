// backend/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true,
        lowercase: true  // Added for consistency with authController
    },
    password: { 
        type: String, 
        required: true 
    }, // plaintext for dev/testing - WARNING: Should be hashed in production!
    role: { 
        type: String, 
        default: "user",
        enum: ["user", "admin"]  // Added validation for allowed roles
    },
}, { 
    timestamps: true 
});

const User = mongoose.model("User", userSchema);
export default User;
// backend/config/db.js
import mongoose from "mongoose";

// NO dotenv import here

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Already loaded by server.js
        
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment");
        }

        await mongoose.connect(mongoURI);
        
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        throw err;
    }
};

export default connectDB;
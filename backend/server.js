// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import connectDB from config/db.js (handles mongoose)
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });

// Initialize Express
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Health check route
app.get("/", (req, res) => res.send("API running"));

// Add test route (good for debugging)
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Start server after DB connection
const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        // Use connectDB from config/db.js
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`✔ Server running on http://localhost:${PORT}`);
        })
        .on("error", (e) => {
            if (e.code === "EADDRINUSE") {
                console.error(`❌ Port ${PORT} is already in use. Try a different port or stop the conflicting process.`);
            } else {
                console.error("❌ Server startup failed:", e.message);
            }
            process.exit(1);
        });
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err.message);
        process.exit(1);
    }
};

startServer();
import express from "express";
import Comment from "./commentModel.js";

const router = express.Router();

// GET COMMENTS BY POST ID
router.get("/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId: postId }).sort({ createdAt: 1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch comments", details: err.message });
    }
});

// CREATE NEW COMMENT
router.post("/", async (req, res) => {
    try {
        const { postId, user, text } = req.body;
        if (!postId || !user || !text) {
            return res.status(400).json({ message: "All fields (postId, user, text) are required" });
        }

        const newComment = new Comment({
            postId,
            user: user.trim(),
            text: text.trim(),
        });
        
        await newComment.save();
        res.status(201).json({ message: "Comment posted successfully", comment: newComment });
    } catch (err) {
        res.status(500).json({ error: "Failed to post comment", details: err.message });
    }
});

export default router;
import express from "express";
import BlogPost from "./blogPostModel.js";

const router = express.Router();

// CREATE BLOG POST
router.post("/", async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newPost = new BlogPost({ title, content, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: "Failed to create post" });
    }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});

// GET SINGLE POST
router.get("/:id", async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch post" });
    }
});

export default router;
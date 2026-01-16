// backend/controllers/commentController.js
import Comment from '../models/commentModel.js';
import asyncHandler from 'express-async-handler';

// @route   POST /api/comments
// @desc    Add a comment to a post
// @access  Private (Requires 'protect' middleware)
export const createComment = asyncHandler(async (req, res) => {
    // This function relies on req.user being populated by the 'protect' middleware.
    
    // 1. Get data from request body and req.user
    const { postId, content } = req.body;
    
    // Ensure req.user exists (The 'protect' middleware usually guarantees this)
    if (!req.user) {
        res.status(401);
        throw new Error("Unauthorized: User data missing (Protect middleware failed)");
    }
    
    // Get necessary user data from the object attached by the 'protect' middleware
    const userId = req.user._id;
    // Use the username field, or fallback to email for display name
    const authorName = req.user.username || req.user.email;
    
    // 2. Validation
    if (!postId || !content) {
        res.status(400);
        throw new Error("Post ID and comment content are required.");
    }
    
    // 3. Create new comment document
    const comment = new Comment({
        post: postId,
        user: userId,
        author: authorName,
        content: content.trim(),
    });
    
    // 4. Save and Respond
    const createdComment = await comment.save();
    
    res.status(201).json({
        message: "Comment posted successfully",
        comment: createdComment
    });
});

// @route   GET /api/comments/:postId
// @desc    Get all comments for a specific post
// @access  Public (Anyone can view comments)
export const getCommentsByPostId = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    
    if (!postId) {
        res.status(400);
        throw new Error("Post ID is required to fetch comments.");
    }
    
    // Find all comments related to the postId, sorted by newest first
    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 });
    
    // Respond with the array of comments
    res.json(comments);
});
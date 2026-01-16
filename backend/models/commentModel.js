// backend/models/commentModel.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    // Link back to the blog post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogPost',
        required: true,
    },
    // Link back to the user who posted the comment
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // The display name of the comment author (optional, but good for stability)
    author: {
        type: String,
        required: true,
    },
    // The actual comment text
    content: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
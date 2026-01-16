// backend/routes/blogRoutes.js
import express from 'express';
import { getAllPosts, getPostById, createPost } from '../controllers/blogPostController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all posts (Public)
router.get('/', getAllPosts);

// POST create post (Protected - Admin only)
router.post('/', protect, admin, createPost);

// GET single post by ID (Public)
router.get('/:id', getPostById);

export default router;
// backend/routes/commentRoutes.js
import express from 'express';
import { createComment, getCommentsByPostId } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createComment); // POST is protected
router.route('/:postId').get(getCommentsByPostId); // GET is public

export default router;
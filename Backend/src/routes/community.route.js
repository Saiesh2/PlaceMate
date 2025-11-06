import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    addComment
} from '../controllers/community.controller.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protectRoute);

// Get all community posts
router.get("/fetch", getPosts);

// Create a new community post
router.post("/create", createPost);

// Update a community post
router.put("/update/:id", updatePost);

// Delete a community post
router.delete("/delete/:id", deletePost);

// Like/Unlike a post
router.post("/posts/:id/like", toggleLike);

// Add a comment to a post
router.post("/add/:id/comments", addComment);

export default router; 
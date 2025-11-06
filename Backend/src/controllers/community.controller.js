import CommunityPost from "../models/community.model.js";
import mongoose from 'mongoose';

// Get all community posts
export const getPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find()
            .populate('userId', 'name email')
            .populate('comments.userId', 'name email')
            .populate('likes', 'name email')
            .sort({ createdAt: -1 });
        
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ 
            message: "Error fetching posts", 
            error: error.message 
        });
    }
};

// Create a new community post
export const createPost = async (req, res) => {
    try {
        const newPost = new CommunityPost({
            ...req.body,
            userId: req.user._id
        });

        await newPost.validate();
        await newPost.save();

        const populatedPost = await CommunityPost.findById(newPost._id)
            .populate('userId', 'name email')
            .populate('likes', 'name email');

        res.status(201).json(populatedPost);
    } catch (error) {
        console.error("Error creating post:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Invalid post data", 
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({ 
            message: "Error creating post", 
            error: error.message 
        });
    }
};

// Update a community post
export const updatePost = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await CommunityPost.findOne({ 
            _id: req.params.id, 
            userId: req.user._id 
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }

        const updatedPost = await CommunityPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { 
                new: true,
                runValidators: true
            }
        )
        .populate('userId', 'name email')
        .populate('likes', 'name email')
        .populate('comments.userId', 'name email');

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: "Invalid post data", 
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        res.status(500).json({ 
            message: "Error updating post", 
            error: error.message 
        });
    }
};

// Delete a community post
export const deletePost = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await CommunityPost.findOne({ 
            _id: req.params.id, 
            userId: req.user._id 
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found or unauthorized" });
        }

        await CommunityPost.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ 
            message: "Error deleting post", 
            error: error.message 
        });
    }
};

// Like/Unlike a post
export const toggleLike = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await CommunityPost.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const likeIndex = post.likes.indexOf(req.user._id);
        
        if (likeIndex === -1) {
            // Like the post
            post.likes.push(req.user._id);
        } else {
            // Unlike the post
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        
        const populatedPost = await CommunityPost.findById(post._id)
            .populate('userId', 'name email')
            .populate('likes', 'name email')
            .populate('comments.userId', 'name email');

        res.status(200).json(populatedPost);
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ 
            message: "Error toggling like", 
            error: error.message 
        });
    }
};

// Add a comment to a post
export const addComment = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        if (!req.body.content || req.body.content.trim().length === 0) {
            return res.status(400).json({ message: "Comment content is required" });
        }

        const post = await CommunityPost.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments.push({
            userId: req.user._id,
            content: req.body.content.trim()
        });

        await post.save();
        
        const populatedPost = await CommunityPost.findById(post._id)
            .populate('userId', 'name email')
            .populate('likes', 'name email')
            .populate('comments.userId', 'name email');

        res.status(200).json(populatedPost);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ 
            message: "Error adding comment", 
            error: error.message 
        });
    }
}; 
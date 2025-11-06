import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Comment content is required'],
        trim: true,
        minlength: [1, 'Comment cannot be empty'],
        maxlength: [1000, 'Comment cannot exceed 1000 characters']
    }
}, { timestamps: true });

const communityPostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        trim: true,
        minlength: [10, 'Content must be at least 10 characters long'],
        maxlength: [5000, 'Content cannot exceed 5000 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['General', 'Career', 'Education', 'Technology', 'Other'],
            message: '{VALUE} is not a valid category'
        }
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add index for better query performance
communityPostSchema.index({ createdAt: -1 });
communityPostSchema.index({ category: 1 });
communityPostSchema.index({ userId: 1 });

// Virtual for like count
communityPostSchema.virtual('likeCount').get(function() {
    return this.likes.length;
});

// Virtual for comment count
communityPostSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// Pre-save middleware to ensure unique likes
communityPostSchema.pre('save', function(next) {
    if (this.isModified('likes')) {
        this.likes = [...new Set(this.likes)];
    }
    next();
});

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);

export default CommunityPost; 
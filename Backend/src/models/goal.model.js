import mongoose from "mongoose";

const GoalSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Technical Skills", "Interview Prep", "Projects", "Soft Skills"],
      required: true,
    },
    targetDate: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "Archived"],
      default: "Not Started",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    progress: {
      current: {
        type: Number,
        default: 0,
      },
      target: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    reminders: [
      {
        date: Date,
        message: String,
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", GoalSchema);

export default Goal;
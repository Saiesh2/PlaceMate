import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you have a user model
    required: true,
  },
  resumeText: String,
  summarizedText: String,
  font: String,
  theme: String,
  type: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Resume", resumeSchema);

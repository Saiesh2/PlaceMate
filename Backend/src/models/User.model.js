import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

// ✅ Check if model exists before creating
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;

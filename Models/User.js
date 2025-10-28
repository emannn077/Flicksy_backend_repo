const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_picture: { type: String },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// ✅ Prevent OverwriteModelError
const User = mongoose.model("User", userSchema)

module.exports = User

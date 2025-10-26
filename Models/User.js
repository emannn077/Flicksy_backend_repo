const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_picture: { type: String, default: "" },
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)

module.exports = User // ✅ export the model directly

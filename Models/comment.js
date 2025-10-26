const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    thread: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment

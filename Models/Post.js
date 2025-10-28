const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challenge_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: false, // not required for every post
  },
  image_url: {
    type: String,
    required: true,
    trim: true,
  },
  caption: {
    type: String,
    trim: true,
  },
})

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
module.exports = Post

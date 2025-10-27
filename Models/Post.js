const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  challenge_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'challenge',
    required: true
  },

  image_url: {
    type: String,
    required: true,
    trim: true
  },

  caption: {
    type: String,
    trim: true
  }
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post

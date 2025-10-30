const User = require("../models/User")
const Post = require("../Models/Post")

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user_id", "username profile_picture points")
      .populate("challenge_id", "title")
    res.status(200).json(posts)
  } catch (err) {
    throw err
  }
}

const GetPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("user_id", "username profile_picture points")
      .populate("challenge_id", "title")
    res.send(post)
  } catch (err) {
    throw err
  }
}

const CreatePost = async (req, res) => {
  try {
    const { image, caption, user_id, challenge_id } = req.body

    if (!image || !user_id) {
      return res.status(400).json({ error: "Image and user_id are required" })
    }

    const newPost = await Post.create({
      user_id,
      challenge_id: challenge_id || null,
      image_url: image,
      caption: caption || "",
    })

    let updatedUser = null

    // Add points if the user completed a challenge
    if (challenge_id) {
      const challenge = await Challenge.findById(challenge_id)
      if (challenge) {
        const addPoints = Math.min(Math.max(challenge.points || 5, 5), 10)

        updatedUser = await User.findByIdAndUpdate(
          user_id,
          { $inc: { points: addPoints } },
          { new: true }
        )
      }
    }

    res.status(201).json(newPost)
  } catch (err) {
    console.error("CreatePost error:", err.message)
    res
      .status(500)
      .json({ error: "Failed to create post", details: err.message })
  }
}
const GetPostsByUser = async (req, res) => {
  try {
    const { id } = req.params
    const posts = await Post.find({ user_id: id })
      .populate("user_id", "username profile_picture points")
      .populate("challenge_id", "title")
    console.log(posts)
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" })
    }

    res.status(200).json(posts)
  } catch (err) {
    console.error("GetPostsByUser error:", err.message)
    res.status(500).json({ message: "Server error", details: err.message })
  }
}
const CreatePostForUser = async (req, res) => {
  try {
    const user_id = req.params.id
    const { image, caption, challenge_id } = req.body

    if (!image) {
      return res.status(400).json({ error: "Image is required" })
    }

    const newPost = await Post.create({
      user_id,
      challenge_id: challenge_id || null,
      image_url: image,
      caption: caption || "",
    })

    if (challenge_id) {
      await User.findByIdAndUpdate(user_id, { $inc: { points: 10 } })
    }

    res.status(201).json(newPost)
  } catch (err) {
    console.error("CreatePostForUser error:", err.message)
    res
      .status(500)
      .json({ error: "Failed to create post", details: err.message })
  }
}

const DeletePost = async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.id })
    res.send({ msg: "Post Deleted", payload: req.params.id, status: "Ok" })
  } catch (err) {
    throw err
  }
}

module.exports = {
  GetPosts,
  GetPostById,
  CreatePost,
  DeletePost,
  CreatePostForUser,
  GetPostsByUser,
}

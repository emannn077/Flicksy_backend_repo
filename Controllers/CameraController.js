const Post = require("../models/Post")
const User = require("../models/User")

const CreateCameraPost = async (req, res) => {
  try {
    const { image, user_id, caption, challenge_id } = req.body

    // Validation
    if (!image || !user_id) {
      return res.status(400).json({ message: "Image and user_id are required" })
    }

    // Create new post
    const newPost = await Post.create({
      user_id,
      challenge_id: challenge_id || null,
      image_url: image,
      caption: caption || "",
    })

    // If post came from a challenge, add points
    if (challenge_id) {
      await User.findByIdAndUpdate(user_id, { $inc: { points: 10 } })
    }

    res.status(201).json({
      message: "Photo posted successfully!",
      post: newPost,
    })
  } catch (error) {
    console.error(" Camera post error:", error)
    res
      .status(500)
      .json({ message: "Failed to upload photo", error: error.message })
  }
}

module.exports = { CreateCameraPost }

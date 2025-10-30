const User = require("../models/User")
// Get profile
const GetUserProfile = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select(
      "username profile_picture points email firstName lastName"
    )
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

const UpdateProfile = async (req, res) => {
  try {
    const { id } = req.params
    const { email, username, firstName, lastName } = req.body

    // Validate required fields
    if (!email || !username || !firstName || !lastName) {
      return res.status(400).send({ msg: "Missing required fields." })
    }

    const existingEmailUser = await User.findOne({ email })
    if (existingEmailUser && existingEmailUser._id.toString() !== id) {
      return res.status(400).send({ msg: "Email already in use!" })
    }

    const existingUsernameUser = await User.findOne({ username })
    if (existingUsernameUser && existingUsernameUser._id.toString() !== id) {
      return res.status(400).send({ msg: "Username already taken!" })
    }

    let imagePath = req.body.profile_picture || ""

    if (req.file) {
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
      if (!validTypes.includes(req.file.mimetype)) {
        return res.status(400).json({
          error: "Invalid image format. Only JPEG, PNG, JPG, or WEBP allowed.",
        })
      }
      imagePath = `/uploads/${req.file.filename}`
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        username,
        email,
        profile_picture: imagePath,
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).send({ msg: "User not found." })
    }

    res
      .status(200)
      .send({ msg: "Profile updated successfully!", user: updatedUser })
  } catch (error) {
    console.error("UpdateProfile error:", error)
    res
      .status(500)
      .send({ msg: "Error updating profile", error: error.message })
  }
}

const GetUserPosts = async (req, res) => {
  try {
    const { id } = req.params
    const posts = await Post.find({ user_id: id })
      .populate("challenge_id", "title")
      .sort({ createdAt: -1 }) // used sort here so when we post a new picture it will be shown first in the home/Profile Page and the older post will be below

    res.status(200).json(posts)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user posts", error: error.message })
  }
}
const AddPoints = async (id, points) => {
  const user = await User.findById(id)
  if (!user) throw new Error("user not found")

  user.points += points
  await user.save()
  return user
}
module.exports = {
  GetUserProfile,
  UpdateProfile,
  GetUserPosts,
  AddPoints,
}

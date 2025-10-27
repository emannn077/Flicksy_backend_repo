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
    const { email, username, firstName, lastName, profile_picture } = req.body

    // Check if another user already uses this email
    const existingEmailUser = await User.findOne({ email })
    if (existingEmailUser && existingEmailUser._id.toString() !== id) {
      return res.status(400).send({ msg: "Email already in use!" })
    }

    // Check if another user already uses this username
    const existingUsernameUser = await User.findOne({ username })
    if (existingUsernameUser && existingUsernameUser._id.toString() !== id) {
      return res.status(400).send({ msg: "Username already taken!" })
    }

    // Proceed to update user info
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, username, email, profile_picture },
      { new: true }
    )

    res
      .status(200)
      .send({ msg: "Profile updated successfully!", user: updatedUser })
  } catch (error) {
    console.error(error)
    res.status(500).send({ msg: "Error updating profile" })
  }
}

module.exports = {
  GetUserProfile,
  UpdateProfile,
}

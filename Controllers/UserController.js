const User = require("../models/user")
const bcrypt = require("bcrypt")

// ===== AUTH FUNCTIONS =====
exports.auth_signup_post = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      profile_picture,
    } = req.body

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser)
      return res.status(400).json({ msg: "Username or email already taken" })

    // Only check confirmPassword — do NOT save it
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ msg: "Password and confirm password must match" })

    // Hash password and create user
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      profile_picture: profile_picture || "",
      points: 0,
    })

    res
      .status(201)
      .json({ msg: `User ${user.username} registered successfully`, user })
  } catch (error) {
    res.status(500).json({ msg: "Error registering user", error })
  }
}

exports.auth_signin_post = async (req, res) => {
  try {
    const { username, password } = req.body

    const userInDatabase = await User.findOne({ username })
    if (!userInDatabase)
      return res.status(404).json({ msg: "Invalid credentials" })

    const validPassword = bcrypt.compareSync(password, userInDatabase.password)
    if (!validPassword)
      return res.status(404).json({ msg: "Invalid credentials" })

    // Initialize session
    req.session.user = {
      id: userInDatabase._id,
      username: userInDatabase.username,
      firstName: userInDatabase.firstName,
      lastName: userInDatabase.lastName,
      email: userInDatabase.email,
      profile_picture: userInDatabase.profile_picture,
      points: userInDatabase.points,
    }

    res.status(200).json({ msg: "Login successful", user: req.session.user })
  } catch (error) {
    res.status(500).json({ msg: "Error logging in", error })
  }
}

exports.auth_signout_get = async (req, res) => {
  req.session.destroy()
  res.status(200).json({ msg: "Logged out successfully" })
}

// ===== USER PROTECTED ACTIONS =====
exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.params.id)

    if (!user) return res.status(404).json({ msg: "User not found" })

    const matched = bcrypt.compareSync(oldPassword, user.password)
    if (!matched)
      return res.status(400).json({ msg: "Old password is incorrect" })

    const hashedPassword = bcrypt.hashSync(newPassword, 10)
    user.password = hashedPassword
    await user.save()

    res.status(200).json({ msg: "Password updated successfully" })
  } catch (error) {
    res.status(500).json({ msg: "Error updating password", error })
  }
}

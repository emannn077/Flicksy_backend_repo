const User = require("../models/User")
const middleware = require("../middleware")

const auth_signup_post = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, profile_picture } =
      req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.exists({ email })
    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        profile_picture,
        password: passwordDigest,
      })
      res.status(200).send(user)
    }
  } catch (error) {
    throw error
  }
}

const auth_signin_post = async (req, res) => {
  try {
    const { username, password } = req.body

    // Check if user exists
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).send({ status: "Error", msg: "User not found!" })
    }

    // Check password
    const matched = await middleware.comparePassword(password, user.password)
    if (!matched) {
      return res
        .status(401)
        .send({ status: "Error", msg: "Incorrect password!" })
    }

    // Token payload
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profile_picture: user.profile_picture,
    }

    // Create token
    const token = middleware.createToken(payload)

    res.status(200).send({ user: payload, token })
  } catch (error) {
    console.error("Sign-in error:", error)
    res.status(500).send({ status: "Error", msg: "Server error during login." })
  }
}
const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.id)
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.id, {
        passwordDigest,
      })
      let payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      }
      return res
        .status(200)
        .send({ status: "Password Updated!", user: payload })
    }
    res
      .status(401)
      .send({ status: "Error", msg: "Old Password did not match!" })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: "Error",
      msg: "An error has occurred updating password!",
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  auth_signup_post,
  auth_signin_post,
  UpdatePassword,
  CheckSession,
}

const { User } = require("../models/user")
const middleware = require("../middleware/index")

//to register User
const Register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, profile_picture } =
      req.body

    const existingUser = await User.exist({ email })
    if (existingUser) {
      return res
        .status(400)
        .send("A user has already been registered with this email ")
    }
    const passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      passwordDigest,
      profile_picture,
      points: 0,
    })

    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Error registering user" })
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).send("User not found!")

    const matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    if (matched) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        points: user.points,
      }
      const token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    } else {
      return res.status(401).send("Invalid credentials!")
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ msg: "Error logging in" })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.id)

    const matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    if (matched) {
      const passwordDigest = await middleware.hashPassword(newPassword)
      await User.findByIdAndUpdate(req.params.id, { passwordDigest })
      return res.status(200).send("Password updated successfully!")
    }
    res.status(401).send("Old password incorrect!")
  } catch (error) {
    console.log(error)
    res.status(500).send("Error updating password")
  }
}

//to check JWT sessions
const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  Register,
  Login,
  UpdatePassword,
  CheckSession,
}

//for user profile
const User = require("../models/User")
const bcrypt = require("bcrypt")

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).send({ msg: "Errror User not found!" })
    }
  } catch (error) {
    throw error
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body)
    res.status(200).send({ msg: "user updated" })
  } catch (error) {
    throw error
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId)
    res.status(200).send({ msg: "deleted" })
    if (!user) {
      return res.status(400).send({ msg: "user not found" })
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getUser,
  updateUser,
  deleteUser,
}

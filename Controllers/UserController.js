//for user profile
const User = require("../models/User")
const bcrypt = require("bcrypt")

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) res.status(404).send({ msg: "Errror User not found!" })
  } catch (error) {
    throw error
  }
}

// const createUser = async (req, res) => {
//   try {
//     const { firstName, lastName, username, email, password, profile_picture } =
//       req.body
//       if(!firstName || lastName || username || email || password || profile_picture) {
//         res.status(400).send({msg:"fill out the necessary requirement"})
//       }
//       const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10)

//   } catch (error) {
//     throw error
//   }
// }
// const createUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId)
// if(!user){
//     return res.send('No user with that ID exists!')
// }
// const validPassword = bcrypt.compareSync(
//     req.body.oldPassword,
//     user.password
// )
// if (!validPassword) {
//     return res.status(400).send('Your old Password was not correct! Please try again')
// }
// if (req.body.newPassword !== req.body.confirmPassword){
//     return res.status(400).send('Password and confirm password must match')
// }
// const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10)
// user.password = hashedPassword
// await user.save()

//   } catch (error) {
//     throw error
//   }
// }

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId)
    res.status(200).send({ msg: "deleted" })
    if (!user) {
      res.status(400).send({ msg: "user not found" })
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  getUser,
  // createUser,
  deleteUser,
}

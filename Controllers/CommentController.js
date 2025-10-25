const { Comment } = require("../models/comment")

exports.getComments = async (req, res) => {
  try {
    //const comments = await Comment.find({owner: req.session.user._id})
    const comments = await Comment.find({}).populate("owner")
    res.send(comments)
  } catch (error) {
    throw error
  }
}

exports.createComments = async (req, res) => {
  try {
    const comments = await Comment.create(req.body)
    res.send(comments)
  } catch (error) {
    throw error
  }
}

exports.putComments = async (req, res) => {
  try {
  } catch (error) {
    throw error
  }
}

exports.deleteComments = async (req, res) => {
  try {
  } catch (error) {
    throw error
  }
}

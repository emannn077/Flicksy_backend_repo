const Comment = require("../models/comment")

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("owner")
    res.status(200).send(comments)
  } catch (error) {
    throw error
  }
}

const createComments = async (req, res) => {
  try {
    const comments = await Comment.create(req.body)
    res.status(200).send(comments)
  } catch (error) {
    throw error
  }
}

const putComments = async (req, res) => {
  try {
    const comments = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).send(comments)
  } catch (error) {
    throw error
  }
}

const deleteComments = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.id })
    res.status(200).send({ msg: "Comment Deleted", id: req.params.id })
  } catch (error) {
    throw error
  }
}

module.exports = {
  getComments,
  createComments,
  putComments,
  deleteComments,
}

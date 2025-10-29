const Comment = require("../models/Comment")

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("user")
    res.status(200).send(comments)
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error fetching comments", error: error.message })
  }
}

const createComments = async (req, res) => {
  try {
    const comments = await Comment.create(req.body)
    res.status(200).send(comments)
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error creating comment", error: error.message })
  }
}

const putComments = async (req, res) => {
  try {
    const comments = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).send(comments)
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error updating comment", error: error.message })
  }
}

const deleteComments = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.commentId })
    res.status(200).send({ msg: "Comment Deleted", id: req.params.commentId })
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error deleting comment", error: error.message })
  }
}

module.exports = {
  getComments,
  createComments,
  putComments,
  deleteComments,
}

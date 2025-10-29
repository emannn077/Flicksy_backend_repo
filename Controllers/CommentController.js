const Comment = require("../models/Comment")

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("user_id", "username profile_picture")
      .populate("post_id", "caption")
    res.status(200).send(comments)
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error fetching comments", error: error.message })
  }
}

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params
    const comments = await Comment.find({ post: postId })
      .populate("user", "username profile_picture")
      .sort({ createdAt: -1 })
    res.status(200).json(comments)
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Error fetching comments for post", error: error.message })
  }
}

const createComments = async (req, res) => {
  try {
    const { thread, post, user } = req.body
    console.log("Incoming:", req.body)

    if (!post || !user) {
      return res
        .status(400)
        .json({ error: "Missing required fields: post or user" })
    }

    const comment = await Comment.create({
      thread,
      post,
      user,
    })

    const populatedComment = await comment.populate(
      "user",
      "username profile_picture"
    )

    res.status(201).json(populatedComment)
  } catch (error) {
    console.error(" Error creating comment:", error)
    res
      .status(500)
      .json({ msg: "Error creating comment", error: error.message })
  }
}

const putComments = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    )
    res.status(200).send(comment)
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
  getCommentsByPost,
  createComments,
  putComments,
  deleteComments,
}

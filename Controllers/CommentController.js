const Comment = require("../models/comment")

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
    const comments = await Comment.findById(req.params.commentId)

    if (comments.owner.equal(req.session.user._id)) {
      await Comment.updateOne(req.body)
      res.status(200).send(comments)
    } else {
      res.status(400).send("you don't have permission to do that")
    }
  } catch (error) {
    throw error
  }
}

exports.deleteComments = async (req, res) => {
  try {
    const comments = await Comment.findById(req.params.commentId)
    console.log(comments)
    if (comments.owner.equal(req.session.user._id)) {
      await Comment.deleteOne(req.body)
      res.status(200).send(comments)
    } else {
      res.status(400).send("you don't have permission to do that")
    }
  } catch (error) {
    throw error
  }
}

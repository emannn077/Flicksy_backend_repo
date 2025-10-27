const Post = require('../Models/Post')

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    res.send(posts)
  } catch (err) {
    throw err
  }
}

const GetPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    res.send(post)
  } catch (err) {
    throw err
  }
}

const CreatePost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body })
    res.send(post)
  } catch (err) {
    throw err
  }
}

const DeletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.post_Id })
    res.send({ msg: 'Post Deleted', payload: req.params.post_Id, status: 'Ok' })
  } catch (err) {
    throw err
  }
}

module.exports = {
  GetPosts,
  GetPostById,
  CreatePost,
  DeletePost
}

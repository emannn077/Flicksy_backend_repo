const router = require('express').Router()
const controller = require('../Controllers/PostController')

router.get('/', controller.GetPosts)
router.post('/', controller.CreatePost)
router.get('/:postId', controller.GetPostById)
router.delete('/:post_Id', controller.DeletePost)

module.exports = router

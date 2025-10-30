const router = require("express").Router()
const commentctrl = require("../Controllers/CommentController")
const middleware = require("../middleware")

router.get(
  "/post/:postId",
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.getCommentsByPost
)
router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.getComments
)

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.createComments
)

module.exports = router

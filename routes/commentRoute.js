const router = require("express").Router()
const commentctrl = require("../Controllers/CommentController")
const middleware = require("../middleware")

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

router.put(
  "/:commentId",
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.putComments
)

router.delete(
  "/:commentId",
  middleware.stripToken,
  middleware.verifyToken,
  commentctrl.deleteComments
)

module.exports = router

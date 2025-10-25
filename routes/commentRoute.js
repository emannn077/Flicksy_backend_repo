const router = require("express").Router()
const commentctrl = require("../Controllers/CommentController")

router.get("/", commentctrl.getComments)
router.post("/", commentctrl.postComments)
router.put("/:commentId", commentctrl.putComments)
router.delete("/:commentId", commentctrl.deleteComments)

module.exports = router

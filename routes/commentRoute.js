const router =  require("express").Router()
const commentctrl = require("../Controllers/CommentController")



router.get("", commentctrl.getComments)
router.post("", commentctrl.postComments)
router.put("", commentctrl.putComments)
router.delete("", commentctrl.deleteComments)


module.exports = router

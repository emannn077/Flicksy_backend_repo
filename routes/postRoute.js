const router = require("express").Router()
const controller = require("../controllers/PostController")
const middleware = require("../middleware/index")

router.get("/", controller.GetPosts)
router.get("/user/:id", controller.GetPostsByUser)
router.post(
  "/user/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreatePostForUser
)
router.get("/:postId", controller.GetPostById)
router.delete(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePost
)
module.exports = router

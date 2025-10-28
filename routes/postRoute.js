const router = require("express").Router()
const controller = require("../controllers/PostController")
const middleware = require("../middleware/index")

// 🔹 Get all posts
router.get("/", controller.GetPosts)

// 🔹 Get all posts for a specific user
// ⚠️ This must come BEFORE "/:postId" to avoid route conflicts
router.get("/user/:id", controller.GetPostsByUser)

// 🔹 Create a post for a specific user
router.post(
  "/user/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreatePostForUser
)

// 🔹 Get post by ID
router.get("/:postId", controller.GetPostById)

// 🔹 Delete post by ID
router.delete(
  "/:postId",
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePost
)

module.exports = router

const router = require("express").Router()
const controller = require("../controllers/UserController")
const middleware = require("../middleware/index")

// Get user profile
router.get(
  "/profile/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserProfile
)

// Update user profile
router.put(
  "/profile/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateProfile
)

router.get(
  "/profile/:id/posts",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserPosts
)
module.exports = router

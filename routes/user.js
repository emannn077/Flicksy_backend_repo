const router = require("express").Router()
const controller = require("../controllers/UserController")
const middleware = require("../middleware/index")
const upload = require("../middleware/upload")

// Get user profile
router.get(
  "/profile/:id",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserProfile
)

// Update user profile
router.put(
  "/profile/:id/edit",
  middleware.stripToken,
  middleware.verifyToken,
  upload.single("profile_picture"),
  controller.UpdateProfile
)

router.get(
  "/profile/:id/posts",
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetUserPosts
)

module.exports = router

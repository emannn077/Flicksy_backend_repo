const router = require("express").Router()
const { CreateCameraPost } = require("../Controllers/CameraController")
const middleware = require("../middleware/index")

// POST /camera/:userId
router.post(
  "/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  CreateCameraPost
)

module.exports = router

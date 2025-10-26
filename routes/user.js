const router = require("express").Router()
const userCtrl = require("../controllers/UserController")
const middleware = require("../middleware/index")

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.getUserProfile
)

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.createUserProfile
)

router.delete(
  "/:profileId",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.deleteUserProfile
)

module.exports = router

const router = require("express").Router()
const userCtrl = require("../controllers/UserController")
const middleware = require("../middleware/index")

router.get("/", middleware.stripToken, middleware.verifyToken, userCtrl.getUser)

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.createUser
)

router.delete(
  "/:profileId",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.deleteUser
)

module.exports = router

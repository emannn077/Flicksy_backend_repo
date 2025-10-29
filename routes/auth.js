const router = require("express").Router()
const userCtrl = require("../controllers/AuthController")
const middleware = require("../middleware/index")
router.post("/sign-up", userCtrl.auth_signup_post)
router.post("/sign-in", userCtrl.auth_signin_post)
router.put(
  "/update/:id",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.UpdatePassword
)
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.CheckSession
)
module.exports = router

const router = require("express").Router()
const userCtrl = require("../controllers/UserController")

// Auth routes (POST only for API)
router.post("/sign-up", userCtrl.auth_signup_post)
router.post("/sign-in", userCtrl.auth_signin_post)
router.get("/sign-out", userCtrl.auth_signout_get)

module.exports = router

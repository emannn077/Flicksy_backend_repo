const router = require("express").Router()
const userCtrl = require("../controllers/UserController")
const isSignedIn = require("../middleware/is-sign-in")

// User protected actions
router.put("/update/:id", isSignedIn, userCtrl.updatePassword)

module.exports = router

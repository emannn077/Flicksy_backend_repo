const router = require("express").Router()
const { CreateCameraPost } = require("../Controllers/CameraController")

router.post("/", CreateCameraPost)

module.exports = router

const router = require("express").Router()
const controller = require("../Controllers/ChallengeController")
//routes to challenge
router.get("/", controller.GetChallenges)
router.get("/:challengeId", controller.GetChallengeById)
router.post("/", controller.CreateChallenge)
router.delete("/:challenge_id", controller.DeleteChallenge)

module.exports = router

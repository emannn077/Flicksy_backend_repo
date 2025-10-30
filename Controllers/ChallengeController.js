const Challenge = require("../Models/Challenge")
//
const GetChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({})
    res.json(challenges)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch challenges" })
  }
}

const GetChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.challengeId)
    if (!challenge)
      return res.status(404).json({ error: "Challenge not found" })
    res.json(challenge)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch challenge" })
  }
}

const CreateChallenge = async (req, res) => {
  try {
    const { title, description, points } = req.body

    // Validate required fields
    if (!title || !description || points === undefined) {
      return res
        .status(400)
        .json({ error: "Title, description, and points are required" })
    }

    const challenge = await Challenge.create({ title, description, points })
    res.status(201).json(challenge)
  } catch (err) {
    console.error("Error creating challenge:", err)
    res.status(500).json({ error: "Failed to create challenge" })
  }
}

const DeleteChallenge = async (req, res) => {
  try {
    await Challenge.deleteOne({ _id: req.params.challenge_id })
    res.json({
      msg: "Challenge deleted",
      payload: req.params.challenge_id,
      status: "Ok",
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete challenge" })
  }
}

module.exports = {
  GetChallenges,
  GetChallengeById,
  CreateChallenge,
  DeleteChallenge,
}

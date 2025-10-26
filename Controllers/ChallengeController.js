const Challenge = require('../Models/Challenge')

const GetChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({})
    res.send(challenges)
  } catch (err) {
    throw err
  }
}

const GetChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.challengeId)
    res.send(challenge)
  } catch (err) {
    throw err
  }
}

const CreateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create({ ...req.body })
    res.send(challenge)
  } catch (err) {
    throw err
  }
}

const DeleteChallenge = async (req, res) => {
  try {
    await Challenge.deleteOne({ _id: req.params.challenge_id })
    res.send({
      msg: 'Challenge deleted',
      payload: req.params.challenge_id,
      status: 'Ok'
    })
  } catch (err) {
    throw err
  }
}
module.exports = {
  GetChallenges,
  GetChallengeById,
  CreateChallenge,
  DeleteChallenge
}

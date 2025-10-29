const mongoose = require("mongoose")

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
)

const Challenge = mongoose.model("Challenge", challengeSchema)

module.exports = Challenge

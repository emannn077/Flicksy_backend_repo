const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({

  username: { type: String },
  thread: {type: String},

},{ timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment


const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({

  username: { type: String },
  thread: {type: String},
 owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

},{ timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment

//ref post/user/owner

//ref path for ref more than one model e.g owner ref path , refpath : poster but does it work ? not sure

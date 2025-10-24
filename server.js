require("dotenv").config()

const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const methodOverride = require("method-override")
require("./db/index")

const challengeRouter = require("./routes/challengeRoute")
const commentRouter = require("./routes/commentRoute")
const postRouter = require("./routes/postRoute.js")
const userRouter = require("./routes/userRoute")

const app = express()
const PORT = process.env.PORT || 3001
const db = require("./db/index")

app.use(methodOverride("._method"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger("dev"))

//testing the route
app.get("/api", (req, res) => {
  res.send("Flicksy is running")
})

//Api routes

const { error } = require("console")

app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}...`)
})

const express = require('express')
require('dotenv').config()
const path = require('path')
const cors = require('cors')

// Database
const mongoose = require('./db/index')

// Middleware
const methodOverride = require('method-override')
const morgan = require('morgan')

// Routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const commentRouter = require('./routes/commentRoute')
const challengeRouter = require('./routes/challengeRoute')
const postRouter = require('./routes/postRoute')

const app = express()
const port = process.env.PORT || 3001

// ===== MIDDLEWARES =====
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

// ===== ROUTES =====
app.use('/auth', authRouter) // Auth APIs
app.use('/users', userRouter) // Protected user APIs
app.use('/comment', commentRouter)
app.use('/challenge', challengeRouter)
app.use('/post', postRouter)

// ===== START SERVER =====
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

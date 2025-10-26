const express = require("express")
require("dotenv").config()
const path = require("path")

// Database
const mongoose = require("./db/index")

// Middleware
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")
const passUserToView = require("./middleware/pass-user-to-view")

// Routers
const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")

const app = express()
const port = process.env.PORT || 3001

// ===== MIDDLEWARES =====
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passUserToView)

// ===== ROUTES =====
app.use("/auth", authRouter) // Auth APIs
app.use("/users", userRouter) // Protected user APIs

// ===== START SERVER =====
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

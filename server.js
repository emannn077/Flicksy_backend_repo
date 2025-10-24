require("dotenv").config()

const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const methodOverride = require("method-override")
require("./db/index")

const userRouter = require("./routes/userRouter")

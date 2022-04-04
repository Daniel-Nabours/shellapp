const express = require("express")
const mongoose = require("mongoose")
const cfg = require("dotenv").config
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer")

const router = express.Router()
const app = express()

cfg()

mongoose.connect(
  `${process.env.MONGO_URL}:${process.env.MONGO_DEFAULT_PORT}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log("Connected to MongoDB") }
)

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

//naive multipart file storage and upload because why would i spend time setting up S3 on a sample app
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully")
  } catch (error) {
    console.error(error)
  }
})

module.exports = app;
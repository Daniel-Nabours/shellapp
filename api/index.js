import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";

const router = express.Router();
const app = express();

config()

mongoose.connect(
  `${process.env.MONGO_URL}:${process.env.MONGO_DEFAULT_PORT}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => { console.log("Connected to MongoDB"); }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//naive multipart file storage and upload because why would i spend time setting up S3 on a sample app
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.listen(8080, () => {
    console.log("server running and listening on port 8080.")
})
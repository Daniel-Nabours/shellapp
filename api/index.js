import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import authRoute from "./routes/auth/auth.js";
import postRoute from "./routes/posts/posts.js"
import {WebSocketServer} from "ws"

const router = express.Router();
const app = express();

config();
connectToMongo().catch((err) => console.log(err));

async function connectToMongo() { 
  mongoose.connect(
    `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_DEFAULT_PORT}/${process.env.MONGO_DB_NAME}`,
    () => {
      console.log("Connection to MongoDB: ", mongoose.connection.readyState);
    }
  );
}

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

app.use("/auth", authRoute);
app.use("/posts", postRoute);
 


export { app };

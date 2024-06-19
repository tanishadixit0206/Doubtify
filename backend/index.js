import express from 'express';
import bodyParser from 'body-parser';
import  authenticate  from './middleware/Authenticate.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import { db } from './connection.js';
import path from "path";
import mongoose from "mongoose";
import { router as UserRoutes } from "./routes/User.js";
import { router as UserLogin } from "./routes/Login.js";
import {requireAuth}  from './middleware/requireAuth.js';
// dotenv.config()

const app = express();
const port = 5000;

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json());

const JWT_SECRET = "FHHHHHVhsvhdhaee4456sjyjmjyohs6j86j2jshiJSHjsnjmd"

db.connect()

// mongodb connection
// const mongoUrl = "mongodb://127.0.0.1:27017/";

// mongoose
//   .connect(mongoUrl, {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch((e) => console.log(e));
app.use("/user", express.urlencoded({ extended: false }), UserRoutes);

app.use("/", UserLogin);

app.listen(port, () => {
  console.log(`Server Started at port : ${port}`);
});

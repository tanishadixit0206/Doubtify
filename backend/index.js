import express from "express";
import path from "path";
import mongoose from "mongoose";
import { router as UserRoutes } from "./routes/User.js";
import { router as UserLogin } from "./routes/Login.js";
const app = express();
const PORT = 8000;

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

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware for UserRoutes only
app.use("/user", express.urlencoded({ extended: false }), UserRoutes);

// Middleware for login route
app.use("/login", UserLogin);

app.listen(PORT, () => {
  console.log(`Server Started at port : ${PORT}`);
});

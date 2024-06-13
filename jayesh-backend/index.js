const express = require("express");
const path = require("path");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");
const UserRoutes = require("./routes/User");

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mongodb connection
const mongoUrl = "mongodb://127.0.0.1:27017/";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));
//
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server Started at port : ${PORT}`);
});

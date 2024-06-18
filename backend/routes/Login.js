import express from "express";
import bodyParser from "body-parser";
import { hash, compare } from "bcrypt";
import pg from "pg";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import authenticate from "../middleware/Authenticate.js";
import cookieParser from "cookie-parser";

const router = express();
router.use(cookieParser());
router.use(express.static("public"));
// router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
const JWT_SECRET = "FHHHHHVhsvhdhaee4456sjyjmjyohs6j86j2jshiJSHjsnjmd";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "doubtify",
  password: "new_password",
  port: 5432,
});

db.connect();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login_after_register", async (req, res) => {
  const email = req.body.email;
  const pass1 = req.body.password;
  const pass2 = req.body.repassword;
  const user = req.body.user;
  const hashin = await hash(pass1, 10);
  if (pass1 === pass2) {
    try {
      await db.query(
        "INSERT INTO users (username, hash_pass, user_nickname) VALUES ($1, $2, $3)",
        [email, hashin, user]
      );
      console.log("User created successfully");
      res.render("login");
    } catch (error) {
      console.log(error.message);
      res.render("register");
    }
  } else {
    res.render("register");
    console.log("User created not successful");
  }
});

router.post("/home", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashin = await hash(password, 10);
  try {
    const db_pass = await db.query(
      `SELECT hash_pass,user_nickname FROM users WHERE username = $1`,
      [email]
    );
    console.log(db_pass.rows);
    const user = db_pass.rows[0];
    const isMatch = await compare(password, user.hash_pass);
    if (isMatch) {
      console.log("User logged in successfully!");
      const token = jsonwebtoken.sign(
        { id: email, nickname: user.user_nickname },
        JWT_SECRET,
        { expiresIn: "3h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.render("home", { nickname: user.user_nickname });
    }
  } catch (error) {
    console.error("Error logging in user: " + error.message);
    res.status(500).send("Internal server error.");
  }
});

router.get("/profile", authenticate, (req, res) => {
  console.log(req.body);
  res.render("profile");
});

export { router };

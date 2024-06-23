import users from "../models/userModel.js";
import express from "express";
// import { db } from "../connection.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { requireAuth } from "../middleware/requireAuth.js";
const router = express();
import mongoose  from "mongoose";

dotenv.config()


router.post("/register", async (req, res) => {
    const email = req.body.email;
    const pass1 = req.body.password;
    const pass2 = req.body.repassword;
    const user = req.body.username;
  
    if (pass1 !== pass2) {
      return res.send("Passwords do not match!");
    }
  
    try {
      // const duplicateCheck = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      const duplicateCheck = await users.findOne({username:email})
      console.log(duplicateCheck) 
      if (duplicateCheck) {
        return res.send("User with this email already exists!");
      }
  
      const hashedPassword = await bcrypt.hash(pass1, 10);
  
      // await db.query("INSERT INTO users (username, hash_pass, user_nickname) VALUES ($1, $2, $3)", [email, hashedPassword, user]);
      const result = await users.create({
        "username":email,
        "hash_pass":hashedPassword,
        "user_nickname":user
      })
      console.log(result)
      console.log("User created successfully");
      res.send("User created successfully!"); 
    } catch (error) {
      console.error("Error creating user:", error.message);
      res.status(500).send("Error creating user. Please try again later."); 
    }
  });
  

router.post("/login",async (req,res)=>{
  const email = req.body.email
  const password = req.body.password
  const hashin = await bcrypt.hash(password,10)
  try{
      // const db_pass = await db.query(`SELECT hash_pass,user_nickname FROM users WHERE username = $1`,[email])
      const db_pass = await users.findOne({ username: email }, { hash_pass: true, user_nickname: true })
      console.log(db_pass)   
      const user = db_pass; 
      const isMatch = await bcrypt.compare(password, user.hash_pass);
      if(isMatch){
          console.log("User logged in successfully!");
          const token  = jsonwebtoken.sign({id:email,nickname : user.user_nickname},process.env.JWT_SECRET,{expiresIn:"3h"})
          res.cookie("token",token,{
              httpOnly:true,
          })
          res.json({email:email,auth:true,token:token})
      }
      else{
          res.json({auth:false,message:"Invalid login credentials"})
      }
  }   
  catch(error){
      console.error("Error logging in user: " + error.message);
      res.status(500).send("Internal server error.");
  }
})

router.get("/userIsVerified",requireAuth,(req,res)=>{
  res.send("u r verified!")
})


export { router };

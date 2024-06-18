import express from "express";
import { db } from "../connection.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

const router = express();

const JWT_SECRET = "FHHHHHVhsvhdhaee4456sjyjmjyohs6j86j2jshiJSHjsnjmd";


router.post("/register",async (req,res)=>{
  const email = req.body.email
  const pass1 = req.body.password
  const pass2 = req.body.repassword
  const user = req.body.username
  const hashin = await bcrypt.hash(pass1,10)
  if(pass1 === pass2){
      try {
          await db.query("INSERT INTO users (username, hash_pass, user_nickname) VALUES ($1, $2, $3)", [email, hashin, user]);
          console.log("User created successfully")
          res.send("user created successfully")
      } catch (error) {
          console.log("code fatt gya")
          console.log(error.message)
          res.send("user not created successfully")
      }
  }
  else{
      console.log("User created not successful")
      res.send("user not created successfully")
  }
})

router.post("/login",async (req,res)=>{
  const email = req.body.email
  const password = req.body.password
  const hashin = await bcrypt.hash(password,10)
  try{
      const db_pass = await db.query(`SELECT hash_pass,user_nickname FROM users WHERE username = $1`,[email])
      console.log(db_pass.rows)   
      const user = db_pass.rows[0]; 
      const isMatch = await bcrypt.compare(password, user.hash_pass);
      if(isMatch){
          console.log("User logged in successfully!");
          const token  = jsonwebtoken.sign({id:email,nickname : user.user_nickname},JWT_SECRET,{expiresIn:"3h"})
          res.cookie("token",token,{
              httpOnly:true,
          })
          res.json({auth:true,token:token})
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

const verifyJWT=(req,res,next)=>{
  const token = req.headers["x-access-token"]
  if(!token){
      res.send("get a token please")
  }
  if(token){
      jsonwebtoken.verify(token,JWT_SECRET,(err,decoded)=>{
          if(err){
              res.json({auth:false,message:"failed to authenticate"})
          }
          else{
              next();
          }
      })
  }
}

router.get("/isUserVerified" ,verifyJWT ,(req,res)=>{
  res.send("you are authorised!")
})

export { router };

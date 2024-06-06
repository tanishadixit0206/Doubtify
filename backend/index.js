import express from 'express';
import bodyParser from 'body-parser';
import { hash, compare } from 'bcrypt';
import pg from 'pg';

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "doubtify",
    password: "new_password",
    port: 5432,
})

db.connect()

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/register",(req,res)=>{
    res.render("register.ejs")

})
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.post("/login_after_register",async (req,res)=>{
    const email = req.body.email
    const pass1 = req.body.password
    const pass2 = req.body.repassword
    const user = req.body.user
    const hashin = await hash(pass1,10)
    if(pass1 === pass2){
        try {
            await db.query("INSERT INTO users VALUES ($1 $2 $3)",[email,hashin,user]);
            res.render("login.ejs")
        } catch (error) {
            res.json({status:'error'})
        }
    }
    else{
        res.render("register.ejs")
    }
})

app.post("/home",(req,res)=>{
    
})

app.listen(port, () => {
    console.log(`Listening on port : ${port}`)
})



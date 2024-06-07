import jsonwebtoken from 'jsonwebtoken'
import express from 'express';


const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt
    if(token){

    }
    else{
        res.redirect
    }


}
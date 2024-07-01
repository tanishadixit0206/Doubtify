import mongoose from "mongoose";
const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/Doubtify");


const doubtsSchema = new mongoose.Schema({
username: {type:String,required:true},
q_url:{type:String,required:true},
title:{type:String,required:true},
subject:{type:String,required:true},
topic:{type:String,required:true},
sol_url:{type:String},
date:{type:String,required:true}
});

const doubts = connection.model('Doubts', doubtsSchema);

export default doubts
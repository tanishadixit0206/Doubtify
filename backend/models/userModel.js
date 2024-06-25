import mongoose from "mongoose";

const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/Doubtify");


const userSchema = new mongoose.Schema({
username: {type:String,required:true,unique:true},
hash_pass:{type:String,required:true},
user_nickname:{type:String,required:true,unique:true}
});

const users = connection.model('Users', userSchema);

export default users
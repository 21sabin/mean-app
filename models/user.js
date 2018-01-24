const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const config=require("./../config/database");
const jsonwebtoken=require("jsonwebtoken");
const passport=require("passport");

const UserSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});

const User=module.exports=mongoose.model("Users",UserSchema);

module.exports.getUserById=function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername=function(username,callback){
    const query={username:username};
    User.findOne(query,callback);
}

module.exports.addUser=function(newUser,callback){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newUser.username,salt,(err,hash)=>{
            // if(err) throw err;
            newUser.password=hash;
            newUser.save().then((err,user)=>{
                console.log(user);
            });
        })
    })
}

module.exports.comparePassword=function(password,hash,callback){
    bcrypt.compare(password,hash,(err,res)=>{
        callback(err,res);
    })
}


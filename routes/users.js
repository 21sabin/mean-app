
const express=require("express");
const router=express.Router();

const User=require("./../models/user");
const config=require("./../config/database")

//register
router.post("/register",(req,res,next)=>{
    let newUser=new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    })



    User.addUser(newUser,(err,user)=>{
        if(err){
           // res.send({sucess:false,msg:"failed"})
           res.status(403)
        }else{
           // res.send({sucess:true,msg:"new user created"})
           res.status(200);
        }
    })
})

//authentication
router.post("/authenticate",(req,res,next)=>{
    const username=req.body.username;
    const password=req.body.password;

    User.getUserByUsername(username,(err,user)=>{
        // if(err){
        //     console.log(err)
        // }

        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err){
                res.send({sucess:false,msg:"user and passwrod didnot matched"});
            }

            if(isMatch){
                const token=jwt-sign(user,config.secret,{
                    expiresIn:604800
                });
                res.send({
                    sucess:true,
                    token:"JWT"+token,
                    user:{
                        id:user._id,
                        username:user.username,
                        email:user.email
                    }
                })
            }
        })
    })

   
    
})

//profile routes
router.get("/profile",(req,res,next)=>{
    res.send("profile")
})

module.exports=router;
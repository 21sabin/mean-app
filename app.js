const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const cors=require("cors");
const mongoose=require("mongoose");
const passport=require("passport");
const passport_jwt=require("passport-jwt");

var app=express();
const port=3000;

//loading database config file
const config=require("./config/database");

//to send a request from different domain name
app.use(cors())

mongoose.Promise=global.Promise;

//static content
app.use(express.static(path.join(__dirname,'public')))

//passport middleware
app.use(passport.initialize());
app.use(passport.session);

//include passport.js
require("./config/passport").passport;

//connecting to database
mongoose.connect(config.database);

//checking database connected or not
mongoose.connection.on('connected',()=>{
    console.log("connected sucessfully"+config.database)
})

mongoose.connection.on('error',(err)=>{
    console.log("unable to connec to database"+err);
})

const user=require("./routes/users");

//using body parser middleware
//use to get the request body data
app.use(bodyParser.json())

//using middleware
app.use('/users',user);

//index routes
app.get("/",(req,res)=>{
    res.send("invalid end point")
})

app.listen(port,()=>{
    console.log("server started"+port)
})
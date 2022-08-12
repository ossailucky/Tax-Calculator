import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
dotenv.config();
import dbConnect from "./model/dbConnect.js";
import bcrypt from "bcrypt";
import User from "./model/userModel.js";

const saltRounds = 10;


const app = express();

dbConnect();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.post("/register", (req,res)=>{
    bcrypt.hash(req.body.password, saltRounds,(err,hash)=>{
        const newUser = new User({
            email: req.body.email,
            password: hash
        });

        newUser.save((err)=>{
            if(err){
                
                res.status().send({
                    message: "Error creating user",
                    err
                });
            }else{
                res.status(201).send({
                    message: "User Created Successfully"
                });
            }
        });
    });
});

app.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email:email},(err,foundUser)=>{
        if(err){
            res.send(err);
        }else{
            if(foundUser){
                bcrypt.compare(password, foundUser.password,(err,result)=>{
                    if(result === true) {
                        res.send({
                            message: "login successfully",
                            foundUser
                        });
                    }else{
                        res.send(err);
                    }
                });
            }
        }
    });
});


app.listen(5000, ()=>{
    console.log("server has started listening");
});
const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js"); 
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings");
    }
    catch(error){
        req.flash("error",error.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

//passport.authenticate is a middle which authenticates and checks if the user is already registered or not 
router.post("/login",passport.authenticate("local",{failureRedirect :'/login',failureFlash : true}),wrapAsync(async(req,res)=>{
    res.flash("success","Welcome to Wanderlust , You are logged in!");
    res.redirect("/listings");
}));

module.exports = router ;
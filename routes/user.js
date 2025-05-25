const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js"); 
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        //automatically login after signup
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
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
router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect :'/login',failureFlash : true}),wrapAsync(async(req,res)=>{
    res.flash("success","Welcome to Wanderlust , You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; //if redirecturl exist then direct to it else listings 
    res.redirect(redirectUrl);
}));

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{//logout method in passport package
        if(err){
            return next(err);
        }
        req.flash("success","logged you out!");
        res.redirect("/listings");
    });
});

module.exports = router ;
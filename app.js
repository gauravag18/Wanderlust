const express = require("express");
const app = express();
const mongoose = require ("mongoose");
const path= require("path");
const methodOverride = require ("method-override");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require ("ejs-mate");
const session = require("express-session");//REQUIRED SESSIONS
const flash = require("connect-flash");//REQUIRED CONNECT-FLASH
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require ("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
    .then(()=>{ 
        console.log("DB");
    })
    .catch((err)=>{ 
        console.log(err);
    })
async function main(){
  await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//COOKIE AND SESSIONS
const sessionOptions = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000 ,//milli-seconds in one week
        maxAge :7*24*60*60*1000 ,
        httpOnly:true,
    }
};

app.get("/",(req,res)=>{
    res.send("HI,I AM ROOT");
});

app.use(session(sessionOptions));
app.use(flash());
//USING SESSIONS AND FLASH BEFORE ROUTES

//User Login and Authenticate
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MIDDLEWARE FOR FLASH 
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;//store details fo current user so we use it in ejs template navbar
    next();
});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"delta-student"
//     });
//     //helloworld passed into next function is password
//     let registeredUser = await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// });

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//IF SEARCH FOR A NEW PAGE 
// app.all("*", (req, res, next)=>{
//     next(new ExpressError(404, "Page Not Found!"))
// })

//MIDDLEWARE FOR ERROR HANDLING
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something Went Wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});
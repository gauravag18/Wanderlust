const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:
    {
        type:String,
        required:true,
    },
    description:String,
    image:
    {
        type:String,
        default:"https://images.unsplash.com/photo-1618773928121-c32242e63f39?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        set:(v)=> v=== ""? "https://images.unsplash.com/photo-1618773928121-c32242e63f39?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D" : v,
        //if no image provided will show default image
    },
    price:Number,
    location:String,
    country:String,
    reviews : [{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({reviews : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports =Listing;
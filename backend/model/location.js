const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const LocationSchema=new Schema({
    name:String,
    location_id:Number,
    city_id:Number,
    city:String,
    country_name:String
})
module.exports=mongoose.model("Location",LocationSchema);
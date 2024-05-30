const mongoose= require("mongoose");
const Schema=mongoose.Schema;
const RestaurantSchema=new Schema({
  name:String,
  location_id:Number,
  city_id:Number,
  locality:String,
  thumb:[String,String,String,String],
  aggregate_rating:Number,
  rating_text:String,
  min_price:Number,contact_number:Number,
  cuisine:[{
    id:Number,name:String
  },{
    id:Number,name:String
  }],
  image:String,
  mealtype_id:Number  
});
module.exports=mongoose.model("Restaurant",RestaurantSchema);
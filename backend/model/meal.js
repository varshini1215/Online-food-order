const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const MealSchema=new Schema({
    name:String,
    content:String,
    image:String,
    meal_type:Number
});
module.exports=mongoose.model("Meal",MealSchema);
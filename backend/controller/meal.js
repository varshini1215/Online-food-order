var Meal=require("../model/meal");
exports.fetchmeal=async(req,res)=>{
    try{
        var result=await Meal.find();
        res.status(200).send(result)
    }
    catch{
        res.status(500).send("server error")
    }
}
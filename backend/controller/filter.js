var Filter=require("../model/restaurant");
exports.cityFunc=async(req,res)=>{
    try{
        var City=await Filter.find({city:req.params.city});
        res.status(200).send(City)
    }
    catch{
        res.status(500).send("server error")
    }
};
exports.idFunc=async(req,res)=>{
    try{
        var Filterbyid=await Filter.find({_id:req.params._id});
        res.status(200).send(Filterbyid)
    }
    catch{
        res.status(500).send("server error")
    } 
};
exports.locidFunc=async(req,res)=>{
    try{
        var locid=await Filter.find({location_id:req.params.location_id});
        res.status(200).send(locid)
    }
    catch{
        res.status(500).send("server error")
    } 
};
exports.mealTypeidFunc=async(req,res)=>{
    try{
        var mealtypeid=await Filter.find({mealtype_id:req.params.mealtype_id});
        res.status(200).send(mealtypeid)
    }
    catch{
        res.status(500).send("server error")
    } 
};
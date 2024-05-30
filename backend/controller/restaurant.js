var Restaurant=require("../model/restaurant");
exports.fetchrestaurant=async(req,res)=>{
    try{
        var rest=await Restaurant.find();
        res.status(200).send(rest)
    }
    catch{
        res.status(500).send("server error")
    }
}
exports.filtering = async(req,res)=>{
  const{location_id, mealtype_id, cuisine_id, lowcost, highcost, sort} = req.body
  try{
     const finding ={}

     if(location_id) finding.location_id = location_id
     if(mealtype_id) finding.mealtype_id = mealtype_id
     if(cuisine_id && cuisine_id.length > 0){
      finding.cuisine = { $eleMatch: {id :{ $in : cuisine_id} } };
     }

     if(lowcost!==undefined && highcost!==undefined){
      finding.min_price = {$lte : highcost , $gte : lowcost}
     }

     const sorting ={};

     if(sort){
      sorting.min_price = sort
     }
     const restaurantNames = await Restaurant.find(finding).sort(sorting).exec();
     if (restaurantNames.length == 0) {
      res.json({message:"city not found"})
     }
     else{
      res.json(restaurantNames)
     }
  }
  catch(err){
      res.status(500).json({message : "err"})
  }
}
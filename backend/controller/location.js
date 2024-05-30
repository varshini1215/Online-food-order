var Location=require("../model/location");
exports.fetchlocation=async(req,res)=>{
    try{
        var loc=await Location.find();
        res.status(200).send(loc)
    }
    catch{
        res.status(500).send("server error")
    }
}
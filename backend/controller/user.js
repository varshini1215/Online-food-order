var Sign= require("../model/user");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken")
const SECRET_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpdmF2YXJzaGluaTEyN0BnbWFpbC5jb20iLCJpYXQiOjE3MTE0NDczNDh9.EdQDAznI96Df1XBcjV1Gh1vbXt9nrRJSkAjshkMOsj0"
exports.signup=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
const existinguser=await Sign.findOne({email:email});
if(existinguser){
    return res.status(400).json({message:"User already exists"});
}
const hashpassword=await bcrypt.hash(password,10);
const result=await Sign.create({
    email:email,
    password:hashpassword,
    username:username

});
res.status(201).json(result);
    }
    catch(error){
      console.error(error); 
       res.status(500).json({message:"Something went wrong"});
    }
};
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existinguser=await Sign.findOne({email:email});
if(!existinguser){
    return res.status(404).json({message:"User not found"});

    }

    const match= await bcrypt.compare(password,existinguser.password);
    if(!match){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token= jwt.sign(
        { email: existinguser.email, id: existinguser._id },
        SECRET_KEY
    );
     res.status(201).json({ user:existinguser, token:token });
} catch(error){
    console.error(error);
     res.status(500).json({message:"Something went wrong"})
    }
};
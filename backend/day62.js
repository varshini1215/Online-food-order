var express=require("express");
var app=express();
var port=8700;
var cors=require("cors");
const mongoose=require("mongoose");

app.use(cors());
var router=require("./router");
app.use(express.json());
app.use("/",router);
const mongourl="mongodb+srv://VarshiniSiva:VS07151217@cluster0.xgxls1f.mongodb.net/";
mongoose.connect(mongourl,{
    useNewUrlParser: true
})
.then(success=>{
    console.log("connected");
    app.listen(port,()=>{
        console.log("server");
    })
  
}).catch(error=>{
    console.log("error")
});
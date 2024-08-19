const express=require("express");
const app=express();
app.use(express.json());
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
const ejs=require("ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.set("view engine",'ejs');
var data;



mongoose.connect("mongodb://0.0.0.0:27017/eassets",{
    useNewUrlParser:true,
    useUnifiedTopology:true

},
    
    function (err) {
        if (err) {
            console.error(err);
        }
        else {
            console.log("connected to db");
        }
    });
    app.get("/",(req,res)=>{
        monmodel.find({},(err,assets)=>
        { 
            if(err) throw err;
            
            res.render("index.ejs",{
                asse:assets
            })
            
        })
    });
//schema
const schema={
    Owner:String,
    Name:String,
    Type:String,
    Description:String,
    Area:Number,
    Capacity:Number,
    AssetId:Number,
    NumberOfRooms:Number,
    YearOfConstruction:Number,
    MaintenanceRequired:String,
        
}
const monmodel=mongoose.model("assets",schema);

app.post("/new",(req,res)=>{
    res.sendFile(__dirname+"/data.html")
});
app.get("/move/:id",(req,res)=>{
    data=req.params.id
   res.redirect("/required")
})
//post
app.post("/updates",(req,res)=>{
    console.log("inside the post")
    const data=new monmodel({
        Owner:req.body.assetowner,
        Name:req.body.assetName,
        Type:req.body.assetType,
        Description:req.body.assetDescription,
        Area:req.body.assetArea,
        Capacity:req.body.assetCapacity,
        AssetId:req.body.assetAssetId,
        NumberOfRooms:req.body.assetNumberOfRooms,
        YearOfConstruction:req.body.assetYearOfConstruction,
        MaintenanceRequired:req.body.assetMaintenanceRequired,
    });
    data.save();
    res.redirect('/');
});
app.get("/delete/:id",(req,res)=>{
   var temp=req.params.id
   console.log(temp)
   var data= monmodel.findByIdAndDelete(temp);
   data.exec((err)=>{
    if(err){console.log(err);}
    res.redirect("/")
   })

});

app.post("/required",(req,res)=>{
    console.log(data)
    const den=monmodel.findOneAndUpdate({_id:data},{
        $set:{
        Owner:req.body.assetowner,
        Name:req.body.assetName,
        Type:req.body.assetType,
        Description:req.body.assetDescription,
        Area:req.body.assetArea,
        Capacity:req.body.assetCapacity,
        AssetId:req.body.assetAssetId,
        NumberOfRooms:req.body.assetNumberOfRooms,
        YearOfConstruction:req.body.assetYearOfConstruction,
        MaintenanceRequired:req.body.assetMaintenanceRequired}},{
        
            
        },(err,ned)=>{
            if(ned==null)
            {
                console.log("Nothing found")
            }
            else{
                console.log("got data")
            }
        });
    res.redirect("/")
});





  


app.listen(3002,()=>{
    console.log("on port 3002")
});


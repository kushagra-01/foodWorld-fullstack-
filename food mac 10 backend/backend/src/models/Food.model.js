const mongoose =require("mongoose");

const foodSchema = new mongoose.Schema(
    {
    category:{type:String,required:true},
    name:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String},
    img_url:{type:String,required:true},
    veg:{type:String,required:true},
    best_seller:{type:Boolean,required:true},
  
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

const food = mongoose.model("food",foodSchema);

module.exports=food;
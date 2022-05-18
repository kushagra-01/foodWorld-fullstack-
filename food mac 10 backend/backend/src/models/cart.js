const mongoose =require("mongoose");

const cartSchema = new mongoose.Schema(
    {
   
    name:{type:String,required:true},
    price:{type:Number,required:true},
   
    image:{type:String,required:true},
    size:{type:Number,required:true},
    
  
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

const cart = mongoose.model("cart",cartSchema);

module.exports=cart;
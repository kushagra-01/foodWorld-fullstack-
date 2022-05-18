
const mongoose = require("mongoose");

module.exports = ()=>{
   return mongoose.connect( "mongodb+srv://user:pass@cluster0.4xk9u.mongodb.net/foodbykushagra?retryWrites=true&w=majority");
}
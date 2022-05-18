const express = require("express");

const router = express.Router();

const foodmodel = require("../models/Food.model");
const cart = require("../models/cart")
//api to post food
router.post("", async (req, res) => {
  try {
    const food = await foodmodel.create(req.body);
    return res.send(food);
  } catch (err) {
    return res.send(err.message)
  }
});
router.post("/cart", async (req, res) => {
  try {
    const food = await cart.create(req.body);
    return res.send(food);
  } catch (err) {
    return res.send(err.message)
  }
});

//api to get all food
router.get("", async (req, res) => {
  try {
    const food = await foodmodel.find().lean().exec();

    return res.send(food);
  } catch (err) {
    return res.send(err.message);
  }
});
router.get("/cart", async (req, res) => {
  try {
    const food = await cart.find().lean().exec();

    return res.send(food);
  } catch (err) {
    return res.send(err.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const food = await cart.findByIdAndDelete(req.params.id).lean().exec();

    return res.send(food);
  } catch (err) {
    return res.send(err.message);
  }
});
router.get("/best_seller", async (req,res) => {
  try{
    
      const best_seller = req.query.best_seller;
      const showArt=await foodmodel.find({best_seller:true})
 
      .lean().exec();


      return res.send(showArt);
  }catch(err){
    return res.send(err.message);
  } 
});
router.get("/Notbest_seller", async (req,res) => {
  try{
    
      const best_seller = req.query.best_seller;
      const showArt=await foodmodel.find({best_seller:false})
 
      .lean().exec();


      return res.send(showArt);
  }catch(err){
    return res.send(err.message);
  } 
});

//api to search food
router.get("/search", async (req, res) => {
  try {
    const start = req.query.start;
    const end = req.query.end;
    const food = await foodmodel
      .find({ start: start }, { end: end })

      .lean()
      .exec();

    return res.send(food);
  } catch (err) {
    return res.send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const food = await foodmodel.findById(req.params.id);

    return res.send(food);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = router;

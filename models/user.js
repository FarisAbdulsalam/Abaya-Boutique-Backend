const mongoose = require("mongoose");
const customAbayaSchema = require("./custom.js");
const cartSchema = require("./cart.js");
const userSchema = new mongoose.Schema({
  admin: { type: Boolean, default: false },
  username: String,
  password: String,
  customAbayas: [customAbayaSchema],
  cart: [cartSchema],
});
module.exports=mongoose.model("user", userSchema)
const mongoose = require("mongoose");
const customAbaya = require("./custom.js");

const cartSchema = new mongoose.Schema({
  abaya: { type: mongoose.Schema.Types.ObjectId, ref: "Abaya" },
  customAbaya: { type: customAbaya },
  price: { Number, required: true },
  type: { type: String, enum: ["standard", "custom"], required: true },
});

module.exports = cartSchema;

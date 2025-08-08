const mongoose = require("mongoose");

const customAbayaSchema = new mongoose.Schema({
  size: { type: String, required: true },
  material: { type: String, required: true },
  accessory: { type: String, required: true },
  colour: { type: String, required: true },
  style: { type: String, required: true },
  comment: String,
  price: { type: Number, required: true }
});

module.exports = customAbayaSchema;

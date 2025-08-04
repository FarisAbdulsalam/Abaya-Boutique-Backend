const mongoose = require("mongoose");

const customAbayaSchema = new mongoose.Schema({
  size: String,
  material: String,
  accessory: String,
  colour: String,
  style: String,
  comment: String,
});

module.exports = customAbayaSchema;

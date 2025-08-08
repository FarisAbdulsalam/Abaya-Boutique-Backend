const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  abaya: { type: mongoose.Schema.Types.ObjectId, ref: "Abaya" },
  price: Number,
});

module.exports = cartSchema;
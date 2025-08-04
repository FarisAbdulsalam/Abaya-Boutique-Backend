const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  abaya: { type: mongoose.Schema.Types.ObjectId, ref: "Abaya" },
  priceTotal: Number,
});

module.exports = cartSchema;
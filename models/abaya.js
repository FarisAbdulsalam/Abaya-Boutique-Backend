const mongoose = require('mongoose');

const abayaSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  // quantity: {
  //   type: Number,
  //   min: 0,
  //   required: true
  // },
  size: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Abaya = mongoose.model('Abaya', abayaSchema);
module.exports = Abaya;
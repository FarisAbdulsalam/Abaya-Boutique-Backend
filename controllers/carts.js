const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Abaya = require("../models/abaya");
const customAbaya = require("../models/custom");

router.post("/:abayaId/:userId/add-to-cart", async (req, res) => {
  try {
    const userId = req.params.userId;
    const abayaId = req.params.abayaId;
    const user = await User.findById(userId);
    const abaya = await Abaya.findById(abayaId);
    const price = abaya.price;
    user.cart.push({ type: "standard", abaya: abaya._id, price: price });
    user.cartTotal += price;
    user.customAbayas = user.customAbayas.filter((custom) => custom.price);
    await user.save();
    res.json({
      message: "Abaya added to cart",
      cartItem: user.cart[user.cart.length - 1],
      cartTotal: user.cartTotal,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.get("/:userId/cart", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("cart.abaya");
    resjson({
      cart: user.cart,
      cartTotal: user.cartTotal,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

module.exports = router;

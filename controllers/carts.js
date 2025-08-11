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
    await user.populate("cart.abaya");
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
    if (!user) return res.json({ message: "User not found" });
    res.json({
      cart: user.cart,
      cartTotal: user.cartTotal,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.post("/custom-abaya/:userId/add-to-cart", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const { size, material, accessory, colour, style, comment } = req.body;
    const price = 35;
    const customAbaya = { size, material, accessory, colour, style, comment };
    user.cartTotal += price;
    user.cart.push({ type: "custom", customAbaya: customAbaya, price: price });
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

router.delete("/:userId/cart/:abayaId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const abayaId = req.params.abayaId;
    if (!user) {
      return res.json("User not found");
    }
    const abayaIndex = user.cart.findIndex(
      (abaya) => abaya._id.toString() === abayaId
    );
    user.cartTotal -= user.cart[abayaIndex].price;
    user.cart.splice(abayaIndex, 1);
    await user.save();
    await user.populate("cart.abaya");
    res.json({
      message: "Abaya removed from cart",
      cart: user.cart,
      cartTotal: user.cartTotal,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    res.json(user.customAbayas);
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    user.customAbayas.push(req.body);
    await user.save();
    res.json(user.customAbayas[user.customAbayas.length - 1]);
  } catch (err) {
    res.json({ err: err.message });
  }
});

module.exports = router;
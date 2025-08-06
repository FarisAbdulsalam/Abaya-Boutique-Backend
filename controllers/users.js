const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/custom-abayas/:userId", async (req, res) => {
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

router.post("/custom-abayas/:userId", async (req, res) => {
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

router.delete("/custom-abayas/:userId/:customAbayaId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const customAbayaId = req.params.customAbayaId;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const updatedCustomAbayas = user.customAbayas.filter(
      (abaya) => abaya._id.toString() !== customAbayaId
    );
    user.customAbayas = updatedCustomAbayas;
    await user.save();
    res.json({
      message: "Abaya deleted successfully",
      customAbayas: user.customAbayas,
    });
  } catch (err) {
    res.json({ err: err.message });
  }
});

module.exports = router;
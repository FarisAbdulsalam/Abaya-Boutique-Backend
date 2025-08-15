const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/sign-up", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already taken" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    const payload = {
      username: newUser.username,
      _id: newUser._id,
      admin: newUser.admin,
    };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.json({ message: "Invalid credentials. Please try again." });
    }

    const isPassCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPassCorrect) {
      return res.json({ message: "Incorrect password" });
    }
    const payload = {
      username: user.username,
      id: user._id,
      admin: user.admin,
    };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.json({ err: err.message });
  }
});

module.exports = router;

const Abaya = require("../models/abaya");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const cleanName = file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^\w.-]/gi, "");
    cb(null, Date.now() + "-" + cleanName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price, size, quantity } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const createdAbaya = await Abaya.create({
      title,
      price,
      size,
      image,
    });

    res.status(201).json(createdAbaya);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const foundAbaya = await Abaya.find();
    res.status(200).json(foundAbaya);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/:abayaId", async (req, res) => {
  try {
    const foundAbaya = await Abaya.findById(req.params.abayaId);
    if (!foundAbaya) {
      res.status(404);
      throw new Error("Abaya not found.");
    }
    res.status(200).json(foundAbaya);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

router.delete("/:abayaId", async (req, res) => {
  try {
    const delAbaya = await Abaya.findByIdAndDelete(req.params.abayaId);
    res.status(200).json(delAbaya);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put("/:abayaId", async (req, res) => {
  try {
    const updatedAbaya = await Abaya.findByIdAndUpdate(
      req.params.abayaId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedAbaya) {
      res.status(404);
      throw new Error("Abaya not found.");
    }
    res.status(200).json(updatedAbaya);
  } catch (err) {
    console.log(err);
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }

  const updatedAbaya = await Abaya.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });

  res.json(updatedAbaya);
});

module.exports = router;

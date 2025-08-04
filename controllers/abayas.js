const Abaya = require('../models/abaya.js');
const express = require('express');
const router = express.Router();

// CREATE - POST - /abaya
router.post('/', async (req, res) => {
  try {
    const createdAbaya = await Abaya.create(req.body);
    res.status(201).json(createdAbaya);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// INDEX - GET - ReadAll
router.get('/', async (req, res) => {
  try {
    const foundAbaya = await Abaya.find();
    res.status(200).json(foundAbaya);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// READ One - GET - /abaya/:abayaId
router.get('/:abayaId', async (req, res) => {
  try {
    const foundAbaya = await Abaya.findById(req.params.abayaId);
    if (!foundAbaya) {
      res.status(404);
      throw new Error('Abaya not found.');
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

// DELETE - DELETE - /abaya/:abayaId
router.delete('/:abayaId', async (req, res) => {
  try {
    const delAbaya = await Abaya.findByIdAndDelete(req.params.abayaId);
    res.status(200).json(delAbaya);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UPDATE - PUT - /abaya/:abayaId
router.put('/:abayaId', async (req, res) => {
  try {
    const updatedAbaya = await Abaya.findByIdAndUpdate(req.params.abayaId, req.body, {
      new: true,
    });
    if (!updatedAbaya) {
      res.status(404);
      throw new Error('Abaya not found.');
    }
    res.status(200).json(updatedAbaya);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});





module.exports = router;

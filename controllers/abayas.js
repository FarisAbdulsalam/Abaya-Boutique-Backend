const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

// CREATE - POST - /pets
router.post('/', async (req, res) => {
  try {
    const createdPet = await Pet.create(req.body);
    res.status(201).json(createdPet);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// INDEX - GET - ReadAll
router.get('/', async (req, res) => {
  try {
    const foundPets = await Pet.find();
    res.status(200).json(foundPets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// READ One - GET - /pets/:petId
router.get('/:petId', async (req, res) => {
  try {
    const foundPet = await Pet.findById(req.params.petId);
    if (!foundPet) {
      res.status(404);
      throw new Error('Pet not found.');
    }
    res.status(200).json(foundPet);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

// DELETE - DELETE - /pets/:petId
router.delete('/:petId', async (req, res) => {
  try {
    const delPet = await Pet.findByIdAndDelete(req.params.petId);
    res.status(200).json(delPet);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// UPDATE - PUT - /pets/:petId
router.put('/:petId', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
      new: true,
    });
    if (!updatedPet) {
      res.status(404);
      throw new Error('Pet not found.');
    }
    res.status(200).json(updatedPet);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});





module.exports = router;

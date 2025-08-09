const Abaya = require('../models/abaya');
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
// -----------------------------------------------------------------------------------------

// import multer from 'multer';
// import path from 'path';

// إعداد مكان الحفظ واسم الملف
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // مجلد الحفظ
  },
  filename: function (req, file, cb) {
     const cleanName = file.originalname.replace(/\s+/g, '_').replace(/[^\w.-]/gi, '');
     cb(null, Date.now() + '-' + cleanName); // اسم الملف مع التمديد
  }
});

// إعداد الفلتر لقبول الصور فقط
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// post to add new image


// router.post('/', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded or file type not supported.' });
//   }

//   const imagePath = `/uploads/${req.file.filename}`;
//   res.status(200).json({ imageUrl: imagePath });
// });



// -----------------------------------------------------------------------------------------

// // CREATE - POST - /abaya
// router.post('/', async (req, res) => {
//   try {
//     const createdAbaya = await Abaya.create(req.body);
//     res.status(201).json(createdAbaya);
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// });



// CREATE new Abaya with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {

    const { title, price, size, quantity } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}`: null;


    const createdAbaya = await Abaya.create({
      title,
      price,
      size,
      // quantity,
      image
    });

    res.status(201).json(createdAbaya);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
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
    console.log(err)
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});





module.exports = router;

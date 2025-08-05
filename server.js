const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');

const cors = require('cors');

// Import the controller file
const abayaRouter = require('./controllers/abayas.js');
app.use(cors({ origin: 'http://localhost:5173' }));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(logger('dev'));


app.use('/abayas', abayaRouter);
app.use('/uploads', express.static('uploads')); // مسار الصور

app.listen(3001, () => {
  console.log('The express app is ready!');
});

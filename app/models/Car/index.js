const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

/* Car schema */
const Car = new Schema({
  make: {
    type: String
  },
  model: {
    type: String
  },
  year: {
    type: Number
  },
  description: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('cars', Car);

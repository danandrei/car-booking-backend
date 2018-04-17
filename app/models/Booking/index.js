const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

/* Booking schema */
const Booking = new Schema({
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'cars',
  }
}, { timestamps: true });

module.exports = mongoose.model('bookings', Booking);

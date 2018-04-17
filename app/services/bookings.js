// Dependencies
const { ServerError } = require('../helpers/server_error');
const Booking = require('../models/Booking');

function findOne (filter = {}, projections = {}) {
  return Booking
  .findOne(filter, projections)
  .exec();
}

async function create (bookingData) {
  const newBooking = new Booking(bookingData);

  try {
    await newBooking.validate();
    return newBooking.save();
  } catch (validateError) {
    throw new ServerError(validateError, 400);
  }
}

function find (options = {}) {

  const query = {};
  const skip = parseInt(options.skip) || 0;
  const limit = parseInt(options.limit) || 50;

  if (options.car) {
    query.car = options.car;
  }

  return Booking
  .find(query)
  .skip(skip)
  .limit(limit)
  .populate([
    {
      path: 'user'
    }
  ])
  .exec();
}

function remove (bookingId) {
  return Booking
  .remove({
    _id: bookingId
  })
  .exec();
}

module.exports = {
  find,
  create,
  remove,
  findOne,
};

// Dependencies
const { bookingsService } = require('../services');
const { ServerError } = require('../helpers/server_error');
const { getParams, checkParams, isValidObjectId } = require('../helpers/params');

function getAll (query) {
  return bookingsService.find(query);
}

async function createOne (user, car, data) {
  checkParams([
    'startDate',
    'endDate',
  ], data);

  let query = {
    car: car,
    $or: [
      {
        startDate: {
          $gte: data.startDate,
          $lte: data.endDate,
        }
      },
      {
        endDate: {
          $gte: data.startDate,
          $lte: data.endDate,
        }
      }
    ]
  }

  // check if a booking already exists
  const booking = await bookingsService.findOne(query);

  if (booking) {
    throw new ServerError('This car is already booked on the selected dates.');
  }

  return bookingsService.create({
    user,
    car,
    ...data,
  });
}

function removeOne (bookingId) {
  isValidObjectId(bookingId);

  return bookingsService.remove(bookingId);
}

module.exports = {
  getAll,
  removeOne,
  createOne,
};

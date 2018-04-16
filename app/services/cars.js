// Dependencies
const { ServerError } = require('../helpers/server_error');
const Car = require('../models/Car');

function findOne (filter = {}, projections = {}) {
  return Car
  .findOne(filter, projections)
  .exec();
}

async function create (carData) {
  const newCar = new Car(carData);

  try {
    await newCar.validate();
    return newCar.save();
  } catch (validateError) {
    throw new ServerError(validateError, 400);
  }
}

function find (filter = {}) {
  return Car
  .find(filter)
  .exec();
}

async function update (carId, dataToUpdate = {}) {

  const car = await Car
  .findOneAndUpdate(
    {
      _id: carId
    },
    dataToUpdate,
    {
      new: true,
      runValidators: true,
      context: 'query'
    }
  )
  .exec();

  if (!car) {
    throw new ServerError('not-found', 404);
  }

  return car;
}

function remove (carId) {
  return Car.
  remove({
    _id: carId
  })
  .exec();
}

module.exports = {
  findOne,
  create,
  update,
  find,
  remove,
};

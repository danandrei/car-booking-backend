// Dependencies
const { carsService } = require('../services');
const { ServerError } = require('../helpers/server_error');
const { getParams, checkParams, isValidObjectId } = require('../helpers/params');

async function getOne (carId) {
  isValidObjectId(carId);
  const car = await carsService.findOne({ _id: carId });

  if (!car) {
    throw new ServerError('Car not found!', 404);
  }

  return car;
}

function getAll (query) {
  return carsService.find(query);
}

function createOne (data) {
  checkParams([
    'make',
    'model',
    'year',
    'description',
  ], data);

  return carsService.create(data);
}

function updateOne (carId, data) {
  isValidObjectId(carId);

  return carsService.update(carId, { $set: data });
}

function removeOne (carId) {
  isValidObjectId(carId);

  return carsService.remove(carId);
}

module.exports = {
  getOne,
  getAll,
  updateOne,
  removeOne,
  createOne,
};

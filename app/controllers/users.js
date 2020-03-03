// Dependencies
const { usersService } = require('../services')
const { ServerError } = require('../helpers/server_error')
const { getParams, checkParams, isValidObjectId } = require('../helpers/params')

async function getOne(userId) {
  isValidObjectId(userId)
  const user = await usersService.findOne({ _id: userId })

  if (!user) {
    throw new ServerError('User not found!', 404)
  }

  return user
}

async function createOne(data) {
  checkParams(['firstName', 'lastName', 'email', 'password', 'role'], data)

  const role = data.role || 'customer'

  return usersService.create({
    ...data,
    role,
  })
}

module.exports = {
  getOne,
  createOne,
}

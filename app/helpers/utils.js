const bcrypt = require('bcrypt')

/**
 * Generate a random id with the given length
 * @param {Number} length
 * @returns {String} the generated id
 */
function makeId(length) {
  let text = ''
  let possible =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

/**
 * Create hash from value
 * @param {String} value
 */
function createHash(value, callback) {
  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return callback(error)
    }

    bcrypt.hash(value, salt, (error, hash) => {
      if (error) {
        return callback(error)
      }

      return callback(null, hash)
    })
  })
}

module.exports = {
  makeId,
  createHash,
}

const nconf = require('nconf')

nconf.set('database', {
  server: 'heroku_user:heroku123@ds145438.mlab.com:45438',
  dbName: 'heroku_96jww2qr',
})

nconf.set('secrets', {
  jwtSecret: 'rgxVDSWP9jhMAyBWEgqjhuejlGKB2Wb9cwZEXxg8',
})

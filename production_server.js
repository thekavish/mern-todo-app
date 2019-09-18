var server = require('pushstate-server')

server.start({
  port: 8000,
  directory: './build',
})

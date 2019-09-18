var server = require('pushstate-server')

server.start({
    port: 8000,
    host: '127.0.0.1',
    directory: './build',
  }, (err, address) =>
    console.log(`Listening on port ${address.port} (http://${address.address}:${address.port})`)
)

const server = require('pushstate-server')
const openBrowser = require('react-dev-utils/openBrowser')

console.log(`Starting to serve build...\n`)
server.start({
    port: 8000,
    host: '127.0.0.1',
    directory: './build',
  }, (err, address) => {
    const url = `http://${address.address}:${address.port}`
    console.log(`Listening on port ${address.port} (${url})`)
    openBrowser(url)
  },
)

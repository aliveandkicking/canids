const server = require('./src/server-ex')
require('./src/handlers/initializer').run(server)
server.run(3000)

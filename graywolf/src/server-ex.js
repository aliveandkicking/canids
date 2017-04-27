const express = require('express')
const bodyParser = require('body-parser')
const server = express()

server.all('/*', function (req, res, next) {
  console.dir(req)
  res.header('Content-type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

server.use(bodyParser.text())
server.use(bodyParser.json())

var run = function (port) {
  console.log('listening port ' + port)
  server.listen(port)
}

var createRouter = function (root) {
  let router = express.Router()
  if (root) {
    server.use(router)
  }
  return router
}

module.exports.createRouter = createRouter
module.exports.run = run

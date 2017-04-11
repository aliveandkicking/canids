var express = require('express')
var server = express()

var bodyParser = require('body-parser')

let isRuning = false
let handlers = []

var run = function () {
  if (!isRuning) {
    console.dir(handlers)
    server.listen(3000)
  }
}

server.all('/*', function(req, res, next) {
  console.dir(req.body)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

server.use(bodyParser.text());

var addHandler = function (path, handler) {
  server.post(path, handler)
  handlers.push({path, handler})
}

module.exports.addHandler = addHandler
module.exports.run = run

let handler = function (req, res) {
  res.send('handler not found')
}

require('../server-ex').addHandler('/', handler)

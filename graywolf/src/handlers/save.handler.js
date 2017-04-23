let dbApi = require('../db-api').dbApi

module.exports = function (req, res) {
  res.set('Access-Control-Allow-Origin', '*') // biktop
  console.dir(req.body)
  dbApi.executeSql("SELECT save('" + req.body + "')")
  res.send('add task handler called')
}

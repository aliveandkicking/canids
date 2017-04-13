let dbApi = require('../db-api').dbApi

const handler = function (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  dbApi.executeSql("SELECT task_add('" + req.body + "')")
  res.send('add task handler called')
}

module.exports.handler = handler

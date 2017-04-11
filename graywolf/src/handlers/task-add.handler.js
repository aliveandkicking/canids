let dbApi = require('../db-api').dbApi

const SQL = ''

let handler = function (req, res) {

  res.set('Access-Control-Allow-Origin', '*')
  res.send('add task handler called')
  let sql = "SELECT task_add('" + req.body + "')"
  dbApi.executeSql(sql)
}

let path = require('../../../shared/serverapi-constants').constants.TASK_ADD

require('../server-ex').addHandler(path, handler)

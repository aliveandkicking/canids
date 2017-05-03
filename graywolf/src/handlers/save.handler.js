let dbApi = require('../db-api').dbApi

module.exports = function (req, res) {
  console.dir(req.body)
  dbApi.executeSql("SELECT * FROM save('" + JSON.stringify(req.body) + "')", function (result) {
    console.log(result.rows);
    res.send(result.rows)
  })
}

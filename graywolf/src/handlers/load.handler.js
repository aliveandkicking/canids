let dbApi = require('../db-api').dbApi

module.exports = function (req, res) {
  console.dir(req.body) 
  dbApi.executeSql("SELECT * FROM load('" + req.body.entity + "', '" + JSON.stringify(req.body.ids) + "')", function (result) {
    console.log(result.rows);
    res.send(result.rows)
  })
}

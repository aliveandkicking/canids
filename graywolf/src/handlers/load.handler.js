let dbApi = require('../db-api').dbApi

let load = function(entity, ids, callback) {
  dbApi.executeSql("SELECT * FROM load('" + entity + "', '" + JSON.stringify(ids) + "')",
    function (result) {
      console.log(result.rows)
      callback(result.rows)
    }
  )
}

module.exports = function (req, res){
  load(req.body.entity, req.body.ids, (rows) => {
    res.send(rows)
  })
}

module.exports.load = load




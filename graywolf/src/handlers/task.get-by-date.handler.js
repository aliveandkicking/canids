let load = require('./load.handler').load

module.exports = function (req, res){

  load(req.body.entity, req.body.ids, (rows) => {
      
    res.send(rows)

  })
}

module.exports.load = load




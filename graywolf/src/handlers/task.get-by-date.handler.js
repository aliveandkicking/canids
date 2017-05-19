let retrieveTasks = require('../cache/task.cache').retrieveTasks
let dateUtils = require('../../../shared/utils/dateutils').dateUtils

module.exports = function (req, res){
  console.dir(req.body)
  let date = dateUtils.fromString(req.body.date)
  retrieveTasks((tasks) => {
    let result = []
    tasks.forEach((task) => {
      if (task.repeatRules.containsDate(date)) {
        result.push(task.saveToTransportObject())
      }
    });
    res.send(result)
  });
}

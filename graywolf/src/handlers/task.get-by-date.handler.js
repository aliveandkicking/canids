let retrieveTasks = require('../cache/task.cache').retrieveTasks
let dateUtils = require('../../../shared/utils/dateutils').dateUtils
let load = require('../handlers/load.handler').load
let DayModel = require('../../../shared/models/day.model').DayModel

module.exports = function (req, res) {
  retrieveTasks((tasks) => {
    let result = []
    req.body.dates.forEach((dateStr) => {
      let date = dateUtils.fromString(dateStr)
      tasks.forEach((task) => {
        if (task.repeatRules.containsDate(date)) {
          result.push({task: task.saveToTransportObject(), isDone: 0})
        }
      })
    })

    load(DayModel.name, req.body.dates, (rows) => {
      if ((rows) && (Array.isArray(rows))) {
        rows.forEach((row) => {
          row.data.doneTaskIds.forEach(taskId => {
            result.find(info => {
              if (info.task.id === taskId) {
                info.isDone = 1
                return true
              }
            })
          })
        })
      }
      res.send(result)
    })
  })
}

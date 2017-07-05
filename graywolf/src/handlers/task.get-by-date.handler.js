let retrieveTasks = require('../cache/task.cache').retrieveTasks
let dateUtils = require('../../../shared/utils/dateutils').dateUtils
let load = require('../handlers/load.handler').load
let DayModel = require('../../../shared/models/day.model').DayModel

module.exports = function (req, res) {
  retrieveTasks((tasks) => {
    let result = []
    req.body.dates.forEach((dateStr) => {
      let currDateTasks = {date: dateStr, tasks: []}
      let date = dateUtils.fromString(dateStr)
      tasks.forEach((task) => {
        if (task.repeatRules.containsDate(date)) {
          currDateTasks.tasks.push({task: task.saveToTransportObject(), isDone: 0})
        }
      })
      result.push({data: currDateTasks})
    })

    load(DayModel.name, req.body.dates, (rows) => {
      if ((rows) && (Array.isArray(rows))) {
        rows.forEach((row) => {
          if (!row.data.doneTaskIds) {
            return
          }
          const dateInfo = result.find(resultRow => {
            return resultRow.data.date === row.data.id
          })
          if (dateInfo) {
            row.data.doneTaskIds.forEach(taskId => {
              dateInfo.data.tasks.find(info => {
                if (info.task.id === taskId) {
                  info.isDone = 1
                  return true
                }
              })
          })
          }
        })
      }
      res.send(result)
    })
  })
}

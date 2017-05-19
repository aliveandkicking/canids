let load = require('../handlers/load.handler').load
let TaskModel = require('../../../shared/models/task.model').TaskModel
let transportObjectProcessor = require('../../../shared/transport-object-processor').transportObjectProcessor

let tasks = [];

let retrieveTasks = function(callback) {
    load(TaskModel.name, ['*'], function(rows) {
        tasks = []
        if ((rows) && (Array.isArray(rows))) {
            rows.forEach((row) => {
                let task = new TaskModel()
                transportObjectProcessor.loadFromTempObject(task, row.data)
                tasks.push(task)
            })
        } else {
            console.warn('task.cache: ' + rows + ' is not an valid data')
        }
        if (callback) {
            callback(tasks)
        }
  })
}

module.exports.retrieveTasks = retrieveTasks

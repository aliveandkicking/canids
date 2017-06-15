let RepeatRulesModel = require('./repeat-rules.model').RepeatRulesModel
let BaseModel = require('./base.model').BaseModel

class TaskModel extends BaseModel {
  constructor () {
    super()
    this.id = null
    this.name = 'simple task'
    this.repeatRules = new RepeatRulesModel()
  }

  setName (name) {
    this.name = name
    return this
  }
}

module.exports.TaskModel = TaskModel

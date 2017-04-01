import { RepeatRulesModel } from './repeat-rules.model';

export default class TaskModel {    
  constructor (needGenerateTaskId = true) {
    this.id = needGenerateTaskId ? TaskModel._generateTaskId() : 0
    this.name = 'simple task'    
    this.date = new Date()    
    this.repeatRules = null
  }

  setName(name) {
    this.name = name
    return this
  }

  setRepeat(repeat) {
    if (repeat) {
      this.repeatRules = new RepeatRulesModel()      
    } else {
      this.repeatRules = null
    }
  }

  clone () {
    let result = new Task(false)
    result.id = this.id
    result.name = this.name
    for (let i = 0; i < this.dates.length; i++) {
      result.dates.push(this.dates[i].clone())
    }
    return result
  }

  static _generateTaskId () {
    return ++TaskModel.prototype.maxId
  }
}

TaskModel.prototype.maxId = 0

//biktop
export const tasksTemp = [
  new TaskModel().setName('do smth'),
  new TaskModel().setName('save the world'),
  new TaskModel().setName('cure cancer'),
  new TaskModel().setName('kill hope')
]
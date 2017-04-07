import { RepeatRulesModel } from './repeat-rules.model'

export class TaskModel {
  constructor () {
    this.id = null
    this.name = 'simple task'
    this.repeatRules = new RepeatRulesModel()
  }

  setName (name) {
    this.name = name
    return this
  }
}
// biktop
export const tasksTemp = [
  new TaskModel().setName('do smth'),
  new TaskModel().setName('save the world'),
  new TaskModel().setName('cure cancer'),
  new TaskModel().setName('kill hope')
]
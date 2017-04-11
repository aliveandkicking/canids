class Constants {
  constructor () {
    this.SEPARATOR = '/'
    this.TASK = 'task'
    this.ADD = 'add'
    this.TASK_ADD = this.initPath([this.TASK, this.ADD])
  }

  initPath (path) {
    return this.SEPARATOR + path.join(this.SEPARATOR)
  }
}

const constants = new Constants()

console.dir(constants)

module.exports.constants = constants

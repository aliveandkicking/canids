export default class Notification {
  constructor (Id) {
    this.id = Id
    this.subscribers = []
  }

  send (data = null, response = {}) {
    let handled = false
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i](data, response)
      handled = true
    }
    console.log('Notification', this.id, data, response)
    return handled
  }

  subscribe (handler) {
    if ((handler === undefined) || (handler === null)) {
      console.warn('cannot subscribe', this.id, handler)
      return -1
    }
    this.subscribers.push(handler)
    return this.subscribers.length - 1
  }

  unSubscribe (handler) {
    for (let i = 0; i < this.subscribers.length; i++) {
      if (this.subscribers[i] === handler) {
        this.subscribers.splice(i, 1)
        break
      }
    }
  }
}

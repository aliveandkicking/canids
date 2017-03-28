export default class Request {
  constructor (Id) {
    this.id = Id
    this.handler = null
  }

  send (data = null, defaultResponce = null) {
    if (this.handler !== null) {
      console.log('Request', this.id, data)
      return this.handler(data)
    } else {
      console.log('Request has no handler', this.id, data)
      return defaultResponce
    }
  }

  subscribe (handler) {
    if ((handler === undefined) || (handler === null)) {
      console.warn('cannot subscribe', this.id, handler)
    } else if (this.handler !== null) {
      console.warn('Request has handler', this.id, this.handler, handler)
    } else {
      this.handler = handler
    }
  }

  unSubscribe (handler) {
    if (this.handler === handler) {
      this.handler = null
    }
  }
}

import Request from './request'
import Notification from './notification'

const requests = [

]

const notifications = [
  'registerEntity'
]

class RequestList {
  constructor () {
    for (let i = 0; i < requests.length; i++) {
      this[requests[i]] = new Request(requests[i])
    }
  }
}

class NotificationList {
  constructor () {
    for (let i = 0; i < notifications.length; i++) {
      this[notifications[i]] = new Notification(notifications[i])
    }
  }
}

export const request = new RequestList()
export const notification = new NotificationList()

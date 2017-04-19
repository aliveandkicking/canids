import { TaskModel } from './task.model'
import { constants } from '../serverapi-constants'

export class TaskCreateModel {
  constructor () {
    this.task = new TaskModel()
  }

  post () {
    let client = new HttpClient()
    client.post(constants.SERVER_URL + '/task/add',
      function (response) {
        console.log(response)
      },
      JSON.stringify(this.task)
    )
  }
}

var HttpClient =
  function () {
    this.post = function (aUrl, aCallback, value) {
      var anHttpRequest = new XMLHttpRequest()

      anHttpRequest.onreadystatechange =
        function () {
          if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
            aCallback(anHttpRequest.responseText);
          }
        }

      anHttpRequest.open("POST", aUrl, true)
      anHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
      anHttpRequest.send(value)
    }
}

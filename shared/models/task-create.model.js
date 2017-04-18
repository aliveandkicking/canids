import { TaskModel } from './task.model'
import { constants } from '../serverapi-constants'

export class TaskCreateModel {
  constructor () {
    this.task = new TaskModel()
  }

  post () {
    let s = new Date()
    let iterations = 1000000
    for (let i = 0; i <= iterations; i++) {
      this.task.toJson()
    }
    let t = new Date((new Date()).getTime() - s.getTime())
    console.log('time(for ' + iterations + ' reps):', t.getSeconds() + ':' + t.getMilliseconds())
    console.log('1 iteration:', (t.getTime() / iterations / 1000))

    return
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

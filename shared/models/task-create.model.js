import { TaskModel } from './task.model'

export class TaskCreateModel {
  constructor () {
    this.task = new TaskModel()
  }

  post () {
    var client = new HttpClient();
    client.post('http://localhost:3000/task/add',
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

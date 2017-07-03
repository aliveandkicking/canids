let constants = require('./serverapi-constants').constants
let transportObjectProcessor = require('../shared/transport-object-processor').transportObjectProcessor
let dateUtils = require('../shared/utils/dateutils').dateUtils // biktop remove

class ServerApi {
  post (route, object) {
      const result = new Promise((resolve, reject) => {
          let httpRequest = new XMLHttpRequest()
          httpRequest.onreadystatechange =
              function () {
                  if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                      resolve(httpRequest.responseText)
                  }
              }
          httpRequest.open("POST", constants.SERVER_URL + constants.SEPARATOR + route, true) // biktop proper path building
          httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
          httpRequest.setRequestHeader('Content-type', 'application/json')
          httpRequest.send(transportObjectProcessor.buildJsonString(object))
      })
      result.catch((err) => {console.error(err)})
      return result
  }

  save (object) {
    return this.post(constants.SAVE, object)
  }

  load (entity, id, object) {
    let result = this.post(constants.LOAD, this.getLoadRequestObject(entity, id)).
        then(responseText => {
          let transObjs = JSON.parse(responseText)
          if ((object) && (transObjs.length > 0)) {
            transportObjectProcessor.loadFromTempObject(object, transObjs[0].data)
          }
          return transObjs
        }
      )
    return result
  }

  getTasksByDate (date) {
    const path = constants.TASK + constants.SEPARATOR + constants.GETBYDATE
    return this.post(path, {dates: [dateUtils.toString(date)]})
      .then(responseText => {
        console.log('responseText ->>>> ', responseText)
        return JSON.parse(responseText)
      })
  }

  getLoadRequestObject (entity, ids) {
    return {entity, ids: Array.isArray(ids) ? ids : [ids]}
  }
}

module.exports.serverApi = new ServerApi()

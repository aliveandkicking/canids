let constants = require('./serverapi-constants').constants
let transportObjectProcessor = require('../shared/transport-object-processor').transportObjectProcessor
let dateUtils = require('../shared/utils/dateutils').dateUtils // biktop remove

class ServerApi {
    post (route, object, callback) {
        let anHttpRequest = new XMLHttpRequest()

        anHttpRequest.onreadystatechange =
            function () {
                if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
                    console.dir(JSON.parse(anHttpRequest.responseText))
                    if (callback) {
                        callback(anHttpRequest.responseText);
                    }
                }
            }
        anHttpRequest.open("POST", constants.SERVER_URL + constants.SEPARATOR + route, true) // biktop proper path building
        anHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
        anHttpRequest.setRequestHeader('Content-type', 'application/json')
        anHttpRequest.send(transportObjectProcessor.buildJsonString(object))
    }

    save (object, callback) {
        this.post(constants.SAVE, object, callback)
    }

    load (args, callback, object) {
        this.post(constants.LOAD, args, function(responceText) {
            transportObjectProcessor.loadFromJsonString(responceText, object)
            if (callback) {
                callback(anHttpRequest.responseText);
            }
        } )
    }

    getTasksById(date, callback) {
        this.post(constants.TASK + constants.SEPARATOR + constants.GETBYDATE, {date: dateUtils.toString(date)}, callback)
    }
}

module.exports.serverApi = new ServerApi()

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
        anHttpRequest.send(this._buildJsonString(object))
    }

    save (object, callback) {
        this.post(constants.SAVE, object, callback)
    }

    load (args, callback, object) {
        this.post(constants.LOAD, args, function(responceText) {
            this._loadFromTransportObject(object, transportObjectProcessor.getTransportObject(responceText))
            transportObjectProcessor.loadFromJsonString(responceText, object)
            if (callback) {
                callback(anHttpRequest.responseText);
            }
        } )
    }

    getTasksByDate (date, callback) {
        this.post(constants.TASK + constants.SEPARATOR + constants.GETBYDATE, {date: dateUtils.toString(date)}, callback)
    }

    _buildJsonString (object) {
        if (object.toJson) {
            return object.toJson()
        }
        return transportObjectProcessor.buildJsonString(object)
    }

    _loadFromTransportObject (object, transportObject) {
        if (object.loadFromTransportObject) {
            object.loadFromTransportObject(transportObject)
        }
        transportObjectProcessor.loadFromTempObject(object, transportObject)
    }
}

module.exports.serverApi = new ServerApi()

let dateUtils = require('./utils/dateutils').dateUtils

class TransportObjectProcessor {

    buildJsonString (object) {
        let json = JSON.stringify(this.getJsonValue(object))
        console.log(json);
        return json
    }

    getTransportObject(jsonString) {
        return JSON.parse(jsonString)
    }

    loadFromJsonString (jsonString, object) {
        this.loadFromTempObject(object, this.getTransportObject(jsonString))
    }

    loadFromTempObject(object, tempObject) {
        if (!tempObject) {
            return
        }
        for (let key in tempObject) {
            if (tempObject.hasOwnProperty(key)) {
                if (object[key] instanceof Date) {
                    object[key] = dateUtils.fromString(tempObject[key])
                } else if (object[key] instanceof Object) {
                        this.loadFromTempObject(object[key], tempObject[key])
                } else {
                    object[key] = tempObject[key]
                }
            }
        }
    }

    getJsonValue (value) {
        let result = value
        if (value instanceof Date) {
            result = dateUtils.toString(value)
        } else if (Array.isArray(value)) {
            result = value.map((value, i, array) => this.getJsonValue(value))
        } else if (value instanceof Object) {
            result = {}
            for (let key in value) {
                if (value.hasOwnProperty(key)) {
                   if (!(value[key] instanceof Function)) { //biktop
                        result[key] = this.getJsonValue(value[key])
                   }
                }
            }
            if ('id' in result) {
                if (!result.entity) {
                    result.entity = value.constructor.name
                }
            }
        }
    return result
  }
}

module.exports.transportObjectProcessor = new TransportObjectProcessor()
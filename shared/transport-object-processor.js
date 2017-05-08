let dateUtils = require('./utils/dateutils').dateUtils

class TransportObjectProcessor {

    buildJsonString (object) {
        let json = JSON.stringify(this.getJsonValue(object))
        console.log(json);
        return json
    }

    loadFromJsonString (jsonString, object) {
        laodFromTempObject(JSON.parse(jsonString), object)
    }

    loadFromTempObject(tempObject, object) {
        if (!tempObject) {
            return
        }
        for (let key in tempObject) {
            if (tempObject.hasOwnProperty(key)) {
                if (object[key] instanceof Date) {
                    object[key] = dateUtils.fromString(tempObject[key])
                } else if (object[key] instanceof Object) {
                        this.loadFromTempObject(tempObject[key], object[key])
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
                    result[key] = this.getJsonValue(value[key])
                }
            }
            if (!result.entity) {
                result.entity = value.constructor.name
            }
        }
    return result
  }
}

module.exports.transportObjectProcessor = new TransportObjectProcessor()
import { constants } from './serverapi-constants'

class ServerApi {
    constructor() {
    }

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
        anHttpRequest.open("POST", constants.SERVER_URL + route, true)
        anHttpRequest.setRequestHeader('Access-Control-Allow-Origin', '*')
        anHttpRequest.setRequestHeader('Content-type', 'application/json')
        anHttpRequest.send(this.buildJsonString(object))
    }

    save (object, callback) {
        this.post(constants.SAVE, object, callback)
    }

    load (args, callback, object) {
        this.post(constants.LOAD, args, function(responceText) {
            loadFromJsonString(responceText, object)
            if (callback) {
                callback(anHttpRequest.responseText);
            }
        } )
    }

    buildJsonString (object) {
        let json = JSON.stringify(this.getJsonValue(object))
        console.log(json);
        return json
    }

    loadFromJsonString (jsonString, object) {
        laodFromTempObject(JSON.parse(jsonString), object)
    }

    loadFromTempObject(tempObject, object) {
        for (let key in tempObject) {
            if (tempObject.hasOwnProperty(key)) {
                if (object[key] instanceof Date) {
                    let dataArray = tempObject[key].split('/') // biktop
                    object[key] = new Date(dataArray[2], dataArray[0], dataArray[1])
                } else if (object[key] instanceof Object) {
                    if (!tempObject[key]) {
                        laodFromTempObject(object[key], tempObject[key])
                    }
                }
            }
        }
    }

    getJsonValue (value) {
        let result = null
        if (value instanceof Date) {
            return [value.getMonth() + 1, value.getDay() + 1, value.getFullYear()].join('/') // biktop
        } else if (Array.isArray(value)) {
            return value.map((value, i, array) => this.getJsonValue(value))
        } else if (value instanceof Object) {
            result = {}
            for (let key in value) {
                if (value.hasOwnProperty(key)) {
                    result[key] = this.getJsonValue(value[key])
                }
            }
            result.entity = value.constructor.name;
        }
    return result
  }
}

export const serverApi = new ServerApi()

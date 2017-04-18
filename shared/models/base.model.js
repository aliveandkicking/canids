export class BaseModel {
  toJson () {
    let result = this.toJsonObject(this)
    // console.dir(result)
    // console.log(JSON.stringify(result))
    return result
  }

  toJsonObject (value) {
    if (value instanceof Date) {
      return '10/10/2017' // biktop
    } else if (Array.isArray(value)) {
      return value.map((value, i, array) => this._getPropertyForJson(array, i))
    } else if (value instanceof Object) {
      let result = {}
      for (let key in value) {
        if (value.hasOwnProperty(key)) {
          result[key] = this._getPropertyForJson(value, key)
        }
      }
      return result
    }
  }

  _getPropertyForJson (object, key) {
    let value = object[key]
    if (value instanceof Object) {
      return this.toJsonObject(value)
    }
    if (object.getPropertyForJson) {
      return object.getPropertyForJson(key)
    } else {
      return value
    }
  }

  loadPropertyFromJson (property, value){
    // this[property] = value
  }
}
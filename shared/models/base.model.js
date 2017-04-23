export class BaseModel {
  toJson () {
    let result = this.toJsonObject(this).value
    console.dir(result)
    console.log(JSON.stringify(result))
    return JSON.stringify(result)
  }

  toJsonObject (value) {
    let result = { value: null, isCustomObject: false}
    if (value instanceof Date) {
      result.value = '10/10/2017' // biktop
    } else if (Array.isArray(value)) {
      result.value = value.map((value, i, array) => this._getPropertyForJson(array, i))
    } else if (value instanceof Object) {
      result.value = {}
      result.isCustomObject = true
      let property
      for (let key in value) {
        if (value.hasOwnProperty(key)) {
          property = this._getPropertyForJson(value, key)
          if (!property) {
            console.log(1)
          }
          result.value[(property.isCustomObject ? '*' : '') + key] = property.value
        }
      }
      if (!result.value.entity) {
        result.value.entity = value.constructor.name
      }
      if (!result.value.id) {
        result.value.id = null
      }
    }
    return result
  }

  _getPropertyForJson (object, key) { // biktop remaster
    let value = object[key]
    if (value instanceof Object) {
      return this.toJsonObject(value)
    }
    return {value, isCustomObject: false}
  }

}
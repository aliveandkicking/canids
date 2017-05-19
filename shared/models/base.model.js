let serverApi = require('../server-api').serverApi
let transportObjectProcessor = require('../transport-object-processor').transportObjectProcessor

class BaseModel {
  constructor(){
    this.id = null
    this.toJson = this.toJson.bind(this)
  }

  save () {
    serverApi.save(this)
  }

  toJson() {
    return transportObjectProcessor.buildJsonString(this)
  }

  saveToTransportObject () {
    return transportObjectProcessor.getJsonValue(this)
  }

  loadFromTransportObject (obj) {
    transportObjectProcessor.loadFromTempObject(this, obj)
    return this
  }
}

module.exports.BaseModel  = BaseModel

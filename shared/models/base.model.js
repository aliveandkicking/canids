let serverApi = require('../server-api').serverApi;
let transportObjectProcessor = require('../transport-object-processor').transportObjectProcessor;

class BaseModel {
  constructor(){
    this.id = null
  }

  save () {
    serverApi.save(this, null)
  }

  toJson() {
    return transportObjectProcessor.getJsonValue(this)
  }

  loadFromTransportObject(obj) {
    transportObjectProcessor.loadFromTempObject(obj, this)
    return this
  }
}

module.exports.BaseModel  = BaseModel

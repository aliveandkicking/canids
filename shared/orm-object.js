let serverApi = require('./server-api').serverApi
let transportObjectProcessor = require('./transport-object-processor').transportObjectProcessor

class OrmObject {
 constructor () {
    this.id = null
  }

  save () {
    return serverApi.save(this)
  }

  load () {
    return serverApi.load(this.constructor.name, this.id, this)
  }

  saveToTransportObject () {
    return transportObjectProcessor.getJsonValue(this)
  }

  loadFromTransportObject (obj) {
    transportObjectProcessor.loadFromTempObject(this, obj)
    return this
  }
}

module.exports.OrmObject = OrmObject

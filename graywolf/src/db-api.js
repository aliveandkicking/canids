var pg = require('pg')

class DbApi {
  constructor () {
    this.connected = false
    this.client = new pg.Client(require('./connection-params'))
  }

  connect () {
    this.client.connect(function (err) {
      if (err) throw err
    })
    this.connected = true
  }

  executeSql (sql, callback) {
    if (!this.connected) {
      this.connect()
    }
    console.log('sql: ', sql)
    this.client.query(sql, [], 
      function (err, result) {
        console.log('sql result: ', result)
        if (err) throw err
        callback(result)
      }
    )
  }
}

module.exports.dbApi = new DbApi()

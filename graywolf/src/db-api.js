var pg = require('pg')

class DbApi {
  constructor () {
    this.connected = false
    this.client = this.createClient()
  }

  createClient () {
    return (
      new pg.Client({
        user: 'postgres',
        database: 'sandbox',
        password: '123456',
        host: 'localhost',
        port: 5432
      })
    )
  }

  connect () {
    this.client.connect(function (err) {
      if (err) throw err
    })
    this.connected = true
  }

  executeSql (sql) {
    if (!this.connected) {
      this.connect()
    }
    console.log(sql)
    this.client.query(sql, [],
      function (err, result) {
        if (err) throw err
        console.dir(result)
      }
    )
  }
}

module.exports.dbApi = new DbApi()

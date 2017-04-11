var pg = require('pg')

class DbApi {
  constructor () {
    this.connected = false
    this.client = this.createClient()
  }

  createClient () {
    return (
      new pg.Client({
        user: 'postgres', // env var: PGUSER
        database: 'sandbox', // env var: PGDATABASE
        password: '123456', // env var: PGPASSWORD
        host: 'localhost', // Server hosting the postgres database
        port: 5432 // env var: PGPORT
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
    this.client.query(sql, [],
      function (err, result) {
        if (err) throw err
        console.dir(result)
      }
    )
  }
}

module.exports.dbApi = new DbApi()

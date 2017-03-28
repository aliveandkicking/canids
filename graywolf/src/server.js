var http = require('http');

function testPg() {
  var pg = require('pg');
 
  // instantiate a new client 
  // the client will read connection information from 
  // the same environment variables used by postgres cli tools 
  var client = new pg.Client({
    user: 'postgres', //env var: PGUSER 
    database: 'sandbox', //env var: PGDATABASE 
    password: '123456', //env var: PGPASSWORD 
    host: 'localhost', // Server hosting the postgres database 
    port: 5432, //env var: PGPORT  
  });
  
  // connect to our database 
  client.connect(function (err) {
    if (err) throw err;
  
    // execute a query on our database 
    client.query('SELECT * FROM main', [], function (err, result) {
      if (err) throw err;
  
      // just print the result to the console 
      console.log(result.rows); // outputs: { name: 'brianc' } 
  
      // disconnect the client 
      client.end(function (err) {
        if (err) throw err;
      });
    });
  });
}

function run() {
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }).listen(8080);

  console.log('Server running on port 8080.');
  testPg()
}

module.exports.run = run;

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Cin',
  database: 'employee_db',
  password: 'admin'
});

module.exports = connection;
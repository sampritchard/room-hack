const express = require('express')
const app = express();
const port = 3000;
require('dotenv').config();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  database : process.env.RDS_DB
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
  var sql = "SELECT * FROM main";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    connection.query("SELECT * FROM main", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
});

// connection.end();
const express = require('express')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
require('dotenv').config();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));

app.get('/', (req, res) => {
  var sql = require('mysql')

  var connection = sql.createConnection({
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
    console.log('connection is looking good')

  connection.query('SELECT email, points FROM email_points GROUP by email', (err, result, fields) => {
      if (err) console.log(err);
      console.log(result)
      res.render('index', {data: result})
    })
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


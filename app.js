const express = require('express')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
require('dotenv').config();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
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

  connection.query('SELECT ep.email, SUM(ep.points) as points, \
  (select REPLACE(room_name,"?","") from abandoned_meetings sub where sub.id = MAX(am.id)) as room_name \
  FROM abandoned_meetings am \
  INNER JOIN email_points ep \
  ON am.event_id = ep.event_id \
  GROUP by ep.email \
  ORDER BY points desc', (err, result, fields) => {
      if (err) console.log(err);
      console.log(result)
      res.render('index', {data: result})
    })
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


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
    database : process.env.RDS_DB,
    charset: "utf8mb4"
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
  ORDER BY points desc limit 10', (err, result, fields) => {
      if (err) console.log(err);
      console.log(result);
      connection.query('select meeting_summary, room_name, iot_request_time, organizer_email from abandoned_meetings order by id desc limit 1', (err, newResult, fields) => {
          if (err) console.log(err);
          let dt1 = new Date();
          let dt2 = new Date(newResult[0].iot_request_time);
          newResult[0].diffMins = diff_minutes(dt1, dt2)
          res.render('index', {data: result, lastCancel: newResult})
        })
    })
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function diff_minutes(dt2, dt1) {
  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}
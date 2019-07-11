const express = require('express')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
require('dotenv').config();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));

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

var json = '{"attendees": [{"id": "12345", "email": "sam@paddle.com", "organizer": true}, {"id": "54321", "email": "blanco@paddle.com", "organizer": false}]}'
obj = JSON.parse(json);

app.post('/', (req, res) => {
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('connection is looking good')
  
    var jsondata = obj;
    var values = [];
  
    for(var i=0; i< jsondata.length; i++)
    values.push([jsondata[i].name,jsondata[i].age]);
  
    connection.query("INSERT INTO main (full_name, room_name) VALUES ?", [values], function(err, result) {
      if(err) {
         console.log(err)
         res.send('Error');
      }
     else {
         res.send('Success');
         console.log(result)
      }
    });
  });
})



console.log('json parsed:', obj)

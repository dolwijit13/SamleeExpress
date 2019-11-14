const express = require('express')
const app = express()
const port = 3000

const mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'testdb'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/',(req,res) => {
	connection.query('SELECT * FROM test',(err,result) => {
		res.send(result);
	})
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
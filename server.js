const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser')
const connection = require('./database')

app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use('/',require('./routes'));

app.get('/',(req,res) => res.send('hello world'));

/*
app.get('/',(req,res) => {
    connection.query('SELECT * FROM posts',(err,result) => {
        res.render('index',{
            posts:result
        });
    })
});

app.get('/add',(req,res) => {
	res.render('add');
});

app.post('/add',(req,res) => {
	const id = req.body.id;
	const name = req.body.name;
	const post = {
		id:id,
		name:name
	}
	connection.query('INSERT INTO test SET ?',post,(err) => {
		console.log('Data Inserted');
		return res.redirect('/');
	});
});

app.get('/edit/:id',(req,res) => {
	
	const edit_postID = req.params.id;
	
	connection.query('SELECT * FROM test WHERE id=?',[edit_postID],(err,results) => {
		if(results){
			res.render('edit',{
				post:results[0]
			});
		}
	});
});

app.post('/edit/:id',(req,res) => {
	const update_id = req.body.id;
	const update_name = req.body.name;
	const userId = req.params.id;
	connection.query('UPDATE `test` SET id = ?, name = ? WHERE id = ?', [update_id, update_name, userId], (err, results) => {
        if(results.changedRows === 1){
            console.log('Post Updated');
        }
		return res.redirect('/');
    });
});

app.get('/delete/:id',(req,res) => {
    connection.query('DELETE FROM `test` WHERE id = ?', [req.params.id], (err, results) => {
        return res.redirect('/');
    });	
});
*/


app.listen(port,() => console.log('Server Runing'));
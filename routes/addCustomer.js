var express = require('express')
var router = express.Router()
const connection = require('../database')
 

router.get('/',(req,res) => {
	connection.query('SELECT * FROM CUSTOMER',(err,result) => {
		res.render('customer',{
            customer:result
        })
    })
});

router.get('/add',(req,res) => {
		res.render('add')
});

router.post('/add',(req,res) => {
    console.log('addasdasd');
	const id = req.body.id;
    const FirstName = req.body.name;
    const LastName = "Inu";
	const post = {
		RegisterID:id,
        FirstName:FirstName,
    }
    console.log(id);
	connection.query('INSERT INTO customer SET ?',post,(err) => {
		console.log('Data Inserted');
		return res.redirect('/customer');
	});
});


module.exports = router
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
		res.render('addCustomer')
});

router.post('/add',(req,res) => {
	const id = req.body.id;
    const FirstName = req.body.FirstName;
	const LastName = req.body.LastName;
	const StartingDate = new Date();
	const post = {
		RegisterID:id,
		FirstName:FirstName,
		LastName:LastName,
		StartingDate:StartingDate
    }
	connection.query('INSERT INTO customer SET ?',post,(err) => {
		console.log('Inserted new customer');
		return res.redirect('/customer');
	});
});


module.exports = router
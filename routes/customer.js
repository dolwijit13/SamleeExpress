var express = require('express')
var router = express.Router()
const connection = require('../database')
var cors = require('cors');

//Read

router.use(cors());

router.get('/',(req,res) => {
	res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM CUSTOMER',(err,result) => {
		res.json(result);
	})
});

router.get('/search/:RegisterID',(req,res) => {
	res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM CUSTOMER where RegisterID=?',req.params.RegisterID,(err,result) => {
		//console.log(result[0].RegisterID);
		res.json(result);
	})
});


//Delete
router.post('/delete',(req,res) => {
	console.log(req.body.RegisterID);
	connection.query("DELETE FROM CUSTOMER WHERE RegisterID = ?",[req.body.RegisterID],(err,result) => {
		if(!err){
			res.json(result);
			console.log('Deleted Customer RegisterID : ' + req.body.RegisterID);
			//console.log(result);
		}
		else{
			console.log(err);
			//res.sendStatus(500);
			return;
		}
	})
});

//update
router.get('/edit/:RegisterID', (req,res) => { 
	connection.query("SELECT * FROM CUSTOMER WHERE RegisterID = ?",[req.params.RegisterID],(err,result) => {
		res.json(result);
	})
});

router.post('/edit/:RegisterID', (req,res) => { 
	const {FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,
		PostalCode,Gender } = req.body;
	
	const oldId = req.params.RegisterID;
	
	connection.query('UPDATE CUSTOMER SET FirstName = ?, LastName = ?,TelephoneNo = ?, EMail = ?, HouseNo = ?, Street = ?\
	, SubDistrict = ?, District = ?, Province = ?, Country = ?, PostalCode = ?, Gender = ?  WHERE RegisterID = ?',
	[FirstName, LastName, TelephoneNo, EMail, HouseNo, Street, SubDistrict, District, Province, Country, PostalCode,
		Gender,oldId], (err, results) => {

			if ( err ){
				res.send(err);
			}
        if(results.changedRows === 1){
			console.log('Updated customer id : '+ oldId);
			res.send("success");
		}
    });
});



//Add
//RegisterID,FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,Gender

router.post('/add',(req,res) => {
	var mxId = 0;
	connection.query('select MAX(RegisterID) FROM CUSTOMER;',(err,result) => {
		mxId = parseInt(result[0]['MAX(RegisterID)'])+1;
		if(Number.isNaN(mxId)) mxId = 1; //Case first customer
	


	const {FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,Gender } = req.body;
	var RegisterID = "" + mxId;
	const tmp=10-RegisterID.length;
	for(var i=1;i<=tmp;i++) RegisterID = "0"+RegisterID;
	const customer = {
		RegisterID,
		FirstName:FirstName,
		LastName,
		TelephoneNo,
		EMail,
		HouseNo,
		Street,
		SubDistrict,
		District,
		Province,
		Country,
		PostalCode,
		Gender
	}
	if(FirstName == undefined || FirstName == "")
	{
		res.status(500).send("FirstName can't be empty");
	}
	else if(LastName == undefined|| LastName == "")
	{
		res.status(501).send("LastName can't be empty");
	}
	else
	{
		connection.query('INSERT INTO customer SET ?',customer,(err) => {
			console.log('Inserted customer id : '+ RegisterID + ' Name :'+FirstName+' '+LastName);
			return res.redirect('/customer');
		});

	}

	})
});


module.exports = router
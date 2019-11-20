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

//Delete
router.delete('/', (req,res) => { 
	//res.header("Access-Control-Allow-Origin", "*");
	connection.query('DELETE FROM CUSTOMER WHERE RegisterID = 0000000003',(err,result,fields) => {
		if(!err){
			res.json(result);
			res.send('delete success');
			return;
		}
		else{
			console.log(err);
			res.sendStatus(500);
			return;
		}
	})
});

//update
router.get('/edit/:RegisterID', (req,res) => { 
	connection.query("SELECT * FROM CUSTOMER WHERE RegisterID = ?",[req.params.RegisterID],(err,result) => {
		console.log(result);
		res.json(result);
	})
});

router.post('/edit/:RegisterID', (req,res) => { 
	const {FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,
		PostalCode,StartingDate,Gender } = req.body;

	const oldId = req.params.RegisterID
	
	connection.query('UPDATE CUSTOMER SET FirstName = ?, LastName = ?,TelephoneNo = ?, EMail = ?, HouseNo = ?, Street = ?\
	, SubDistrict = ?, District = ?, Province = ?, Country = ?, PostalCode = ?, StartingDate = ?, Gender = ?  WHERE RegisterID = ?',
	[FirstName, LastName, TelephoneNo, EMail, HouseNo, Street, SubDistrict, District, Province, Country, PostalCode, StartingDate,
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



//RegisterID,FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,StartingDate,Gender

router.post('/add',(req,res) => {
	var mxId = 0;
	connection.query('select MAX(RegisterID) FROM CUSTOMER;',(err,result) => {
		mxId = parseInt(result[0]['MAX(RegisterID)'])+1;
	


	const {FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,Gender } = req.body;
	StartingDate = new Date();
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
		StartingDate,
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
var express = require('express')
var router = express.Router()
const connection = require('../database')

//Read

router.get('/',(req,res) => {
	res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM CUSTOMER',(err,result) => {
		res.json(result);
    })
});

router.get('/delete/:RegisterID', (req,res) => { 
	res.header("Access-Control-Allow-Origin", "*");
	connection.query("DELETE FROM CUSTOMER WHERE RegisterID = ?",[req.param.RegisterID],(err,result) => {
		res.json(result);
	})
});



//Add
/*wait
//Create
router.get('/add',(req,res) => {
		res.render('addCustomer');
});

//*
||||||| merged common ancestors
//*wait
//Create
router.get('/add',(req,res) => {
		res.render('addCustomer');
});

//*
=======
>>>>>>> b5733e19b35222545c91d71428bc68b5c7d8e8c5
=======

>>>>>>> fb7d05e0be275f395fec9aca6d1d6f891171d359
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


//*wait
//Update
/*router.get('/edit/:RegisterID',(req,res) => {
	
	const edit_ID = req.params.RegisterID;
	
	connection.query('SELECT * FROM CUSTOMER WHERE RegisterID=?',[edit_ID],(err,results) => {
		if(results){
			res.render('edit',{
				customer:results[0]
			});
		}
	});
});


router.post('/edit/:RegisterID',(req,res) => {
	//can't edit primary key
	const {FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,
		PostalCode,StartingDate,Gender } = req.body;

	const oldId = req.params.RegisterID;
	
	connection.query('UPDATE `CUSTOMER` SET FirstName = ?, LastName = ?,TelephoneNo = ?, EMail = ?, HouseNo = ?, Street = ?\
	, SubDistric = ?t, District = ?, Province, = ? Country = ?,PostalCode = ?, StartingDate = ?, Gender = ?  WHERE RegisterID = ?',
	[FirstName, LastName, TelephoneNo, EMail, HouseNo, Street, SubDistrict, District, Province, Country, PostalCode, StartingDate,
		Gender,oldId], (err, results) => {
        if(results.changedRows === 1){
            console.log('Updated customer id : '+ RegisterID);
        }
		return res.redirect('/cutsomer');
    });
});



//Delete
router.get('/delete/:RegisterID',(req,res) => {
    connection.query('DELETE FROM `CUSTOMER` WHERE RegisterID = ?', [req.params.RegisterID], (err, results) => {
        return res.redirect('/cutstomer');
    });	
});

//*/




module.exports = router
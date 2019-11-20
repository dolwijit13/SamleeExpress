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

router.get('/delete/:RegisterID', (req,res) => { 
	res.header("Access-Control-Allow-Origin", "*");
	connection.query("DELETE FROM CUSTOMER WHERE RegisterID = ?",[req.param.RegisterID],(err,result) => {
		res.json(result);
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
=======

>>>>>>> fb7d05e0be275f395fec9aca6d1d6f891171d359
>>>>>>> master
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
			var data = JSON.parse(JSON.stringify(results[0]));
			data["StartingDate"] = getOnlyDate(data["StartingDate"]);
			res.render('editCustomer',{
				customer:data,
			});
		}
	});
});

//get only yyyy-mm-dd in datetime format from query
function getOnlyDate(dtFromQuery){	
	const index = dtFromQuery.indexOf("T");
	if ( index > 0 ){
		return dtFromQuery.slice(0,index);
	}
	return dtFromQuery;
}

router.post('/edit/:RegisterID',(req,res) => {
	//can't edit primary key
	const {FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,
		PostalCode,StartingDate,Gender } = req.body;

	const oldId = req.params.RegisterID;
	
	connection.query('UPDATE CUSTOMER SET FirstName = ?, LastName = ?,TelephoneNo = ?, EMail = ?, HouseNo = ?, Street = ?\
	, SubDistrict = ?, District = ?, Province = ?, Country = ?, PostalCode = ?, StartingDate = ?, Gender = ?  WHERE RegisterID = ?',
	[FirstName, LastName, TelephoneNo, EMail, HouseNo, Street, SubDistrict, District, Province, Country, PostalCode, StartingDate,
		Gender,oldId], (err, results) => {
			if ( err ){
				return res.send(err);
			}
        if(results.changedRows === 1){
            console.log('Updated customer id : '+ oldId);
        }
		return res.redirect('/customer');
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
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




/*wait
//Create
router.get('/add',(req,res) => {
		res.render('addCustomer');
});

//*
//RegisterID,FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,StartingDate,Gender
router.post('/add',(req,res) => {
	const { RegisterID,FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,
		PostalCode,Gender } = req.body;
	StartingDate = new Date();
	const customer = {
		RegisterID : RegisterID,
		FirstName : FirstName,
		LastName : LastName,
		TelephoneNo : TelephoneNo,
		EMail : EMail,
		HouseNo : HouseNo,
		Street : Street,
		SubDistrict : SubDistrict,
		District : District,
		Province : Province,
		Country : Country,
		PostalCode : PostalCode,
		StartingDate : StartingDate,
		Gender : Gender
    }
	connection.query('INSERT INTO customer SET ?',customer,(err) => {
		console.log('Inserted customer id : '+ RegisterID + 'Name :'+FirstName+' '+LastName);
		return res.redirect('/customer');
	});
});

//*/


/*wait
//Update
router.get('/edit/:id',(req,res) => {
	
	const edit_ID = req.params.RegisterID;
	
	connection.query('SELECT * FROM CUSTOMER WHERE id=?',[edit_ID],(err,results) => {
		if(results){
			res.render('edit',{
				customer:results[0]
			});
		}
	});
});


router.post('/edit/:id',(req,res) => {
	//can't edit primary key
	const FirstName = req.body.FirstName;
	const LastName = req.body.LastName;
	const TelephoneNo = req.body.TelephoneNo;
	const EMail = req.body.EMail;
	const HouseNo = req.body.HouseNo;
	const Street = req.body.Street;
	const SubDistrict = req.body.SubDistrict;
	const District = req.body.District;
	const Province = req.body.Province;
	const Country = req.body.Country;
	const PostalCode = req.body.PostalCode;
	const StartingDate = req.body.StartingDate;
	const Gender = req.body.Gender;

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
router.get('/delete/:id',(req,res) => {
    connection.query('DELETE FROM `CUSTOMER` WHERE RegisterID = ?', [req.params.RegisterID], (err, results) => {
        return res.redirect('/cutstomer');
    });	
});

//*/




module.exports = router
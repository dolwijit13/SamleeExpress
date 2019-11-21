var express = require('express')
var router = express.Router()
const connection = require('../database')
var cors = require('cors');

router.use(cors());

connection.on('error', function(err){
	console.log(err.code);
});

//update
router.get('/edit/:SSN', (req,res) => { 
	connection.query("SELECT * FROM EMPLOYEE WHERE SSN = ?",[req.params.SSN],(err,result) => {
		res.json(result);
	})
});

router.post('/edit/:SSN', (req,res) => { 
	const {FirstName,LastName,TelephoneNo,EMail,DateOfBirth,HouseNo,Street,SubDistrict,District,Province,Country,
		PostalCode,StartingDate,Gender,Salary,Education,Position } = req.body;

	const oldId = req.params.SSN;
	
	connection.query('UPDATE EMPLOYEE SET FirstName = ?, LastName = ?,TelephoneNo = ?, EMail = ?, DateOfBirth = ?, HouseNo = ?, Street = ?\
	, SubDistrict = ?, District = ?, Province = ?, Country = ?, PostalCode = ?, StartingDate = ?, Gender = ?, Salary = ?\
	 , Education = ?, Position = ? WHERE SSN = ?',
	[FirstName, LastName, TelephoneNo, EMail, DateOfBirth , HouseNo, Street, SubDistrict, District, Province, Country, PostalCode, StartingDate,
		Gender,Salary,Education,Position,oldId], (err, results) => {
		if ( err ){
			res.status(403).send("internal error!");
			throw err;
		}
		res.send("success");
		console.log("success, update employee SSN:"+oldId);
    });
})

module.exports = router;
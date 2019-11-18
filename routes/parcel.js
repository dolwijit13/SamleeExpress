var express = require('express')
var router = express.Router()
const connection = require('../database')
 

/* for pug
router.get('/',(req,res) => {
	connection.query('SELECT * FROM CUSTOMER',(err,result) => {
		res.render('customer',{
            customer:result
        })
    })
});
*/

//Read
router.get('/',(req,res) => {
	connection.query('SELECT * FROM PARCEL',(err,result) => {
		res.send(result);
    })
});

/*wait
//Update
router.get('/add',(req,res) => {
		res.render('addCustomer');
});
*/


//ParcelID,Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,StartingDate,Gender,ShipmentType,FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN


/*
router.customer('/add',(req,res) => {
	const RegisterID = req.body.RegisterID;
	const FirstName = req.body.FirstName;
	const LastName = req.body.LastName;
	TelephoneNo = req.body.TelephoneNo;
	EMail = req.body.EMail;
	HouseNo = req.body.HouseNo;
	Street = req.body.Street;
	SubDistrict = req.body.SubDistrict;
	District = req.body.District;
	Province = req.body.Province;
	Country = req.body.Country;
	PostalCode = req.body.PostalCode;
	const StartingDate = new Date(); //Now
	Gender = req.body.Gender;
	const post = {
		RegisterID:RegisterID,
		FirstName:FirstName,
		LastName:LastName,
		TelephoneNo:TelephoneNo,
		EMail:EMail,
		HouseNo:HouseNo,
		Street:Street,
		SubDistrict:SubDistrict,
		District:District,
		Province:Province,
		Country:Country,
		PostalCode:PostalCode,
		StartingDate:StartingDate,
		Gender:Gender
    }
	connection.query('INSERT INTO customer SET ?',customer,(err) => {
		console.log('Inserted customer id : '+ RegisterID + 'Name :'+FirstName+' '+LastName);
		return res.redirect('/customer');
	});
});
*/


module.exports = router
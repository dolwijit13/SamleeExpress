var express = require('express')
var router = express.Router()
const connection = require('../database')
 

//Read
router.get('/',(req,res) => {
	res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM PARCEL',(err,result) => {
		res.json(result);
    })
});



//Add

//ParcelID,Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,StartingDate,Gender,ShipmentType,FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN
router.post('/add',(req,res) => {
	var mxId = 0;
	connection.query('select MAX(ParcelID) FROM PARCEL;',(err,result) => {
		mxId = parseInt(result[0]['MAX(RegisterID)'])+1;
	


	const { Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,StartingDate,Gender,ShipmentType,
		FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN} = req.body;
	StartingDate = new Date();
	var ParcelID = "" + mxId;
	const tmp=10-ParcelID.length;
	for(var i=1;i<=tmp;i++) ParcelID = "0"+ParcelID;
	const customer = {
		Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,StartingDate,Gender,ShipmentType,
		FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN
	}
	if(FirstName == undefined)
	{
		res.status(500).send("FirstName can't be empty");
	}
	else if(LastName == undefined)
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
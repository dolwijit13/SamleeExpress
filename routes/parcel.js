var express = require('express')
var router = express.Router()
const connection = require('../database')
 

//Read
router.get('/:SenderID',(req,res) => {
	const RegisterID = req.params.SenderID;
	res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM PARCEL WHERE FK_Send_Customer_SenderID = ?',RegisterID,(err,result) => {
		res.json(result);
    })
});



//Add
//ParcelID,Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,ShipmentType,FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN
router.post('/add/:stockSSN',(req,res) => {
	var mxId = 0;
	connection.query('select MAX(ParcelID) FROM PARCEL;',(err,result) => {
		mxId = parseInt(result[0]['MAX(ParcelID)'])+1;
	


	const { Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,ShipmentType,
		FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID } = req.body;
	const FK_Store_Employee_StockSSN = req.params.stockSSN;
	var ParcelID = "" + mxId;
	console.log(FK_Store_Employee_StockSSN);
	const tmp=10-ParcelID.length;
	for(var i=1;i<=tmp;i++) ParcelID = "0"+ParcelID;
	const parcel = {
		ParcelID,Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,ShipmentType,
		FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN
	}
	if(HouseNo == undefined || HouseNo == "")
	{
		res.status(502).send("HouseNo can't be empty");
	}
	else if(SubDistrict == undefined || SubDistrict == "")
	{
		res.status(503).send("SubDistrict can't be empty");
	}
	else if(District == undefined || District == "")
	{
		res.status(504).send("District can't be empty");
	}
	else if(Province == undefined || Province == "")
	{
		res.status(505).send("Province can't be empty");
	}
	else if(PostalCode == undefined || PostalCode == "")
	{
		res.status(506).send("PostalCode can't be empty");
	}
	else
	{
		connection.query('INSERT INTO parcel SET ?',parcel,(err) => {
			console.log('Inserted parcel id : '+ ParcelID + ' Adress :'+HouseNo+' '+Street+' '+SubDistrict+' '+District+' '+
			Province+' '+Country+' '+PostalCode);
			return res.redirect('/parcel');
		});

	}

	})
});


module.exports = router
var express = require('express')
var router = express.Router()
const connection = require('../database')
var cors = require('cors');

router.use(cors());

connection.on('error', function(err){
	console.log(err.code);
});


//Read
router.get('/:SenderID',(req,res) => {
	const RegisterID = req.params.SenderID;
	res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM PARCEL WHERE FK_Send_Customer_SenderID = ?',RegisterID,(err,result) => {
		res.json(result);
    })
});

//Delete
router.post('/delete',(req,res) => {
	//delte from parcel
	connection.query("DELETE FROM PARCEL WHERE ParcelID = ?",[req.body.ParcelID],(err,result) => {
		if(!err){
			//res.json(result);
			console.log('Deleted Parcel ParcelID : ' + req.body.ParcelID);
		}
		else{
			console.log(err);
			//res.sendStatus(500);
			//return;
		}
	})

	const query = "SELECT ShipmentStatus_ShipmentID FROM ResponseTo WHERE Parcel_ParcelID = ?";
	connection.query(query,req.body.ParcelID,(err,result) => {
		for(var i=0;i<result.length;i++)
		{
			const id = result[i].ShipmentStatus_ShipmentID;
			//delete from ResponseTo
			connection.query("DELETE FROM ResponseTo WHERE ShipmentStatus_ShipmentID = ?",[id],(err2,result2) => {
				if(!err2){
					//res.json(result);
					console.log('Deleted ResponseTo ShipmentStatus_ShipmentID : ' + id);
				}
				else{
					console.log(err);
					//res.sendStatus(500);
					return;
				}
			})

			//delete from ShipmentStatus
			connection.query("DELETE FROM ShipmentStatus WHERE ShipmentID = ?",[id],(err3,result3) => {
				if(!err3){
					//res.json(result);
					console.log('Deleted ShipmentStatus ShipmentID : ' + id);
				}
				else{
					console.log(err);
					//res.sendStatus(500);
					return;
				}
			})
		}

	})
	res.json({});
	return true;
});


//Update
router.post('/edit/:ParcelID', (req,res) => {
	console.log("add parcel");
	const ParcelID = req.params.ParcelID;
	const parcel = req.body;

	const query = "UPDATE Parcel SET ? WHERE ParcelID = ?";

	connection.query(query,[parcel,ParcelID], (err)=>{
		if ( err ){
			res.status(403).send("internal error");
			throw err;
		}
		res.status(200).send("seccess");
	});

});

//Add
//ParcelID,Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,ShipmentType,FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN
router.post('/add/:stockSSN',(req,res) => {
	var mxId = 0;
	connection.query('select MAX(ParcelID) FROM PARCEL;',(err,result) => {
		mxId = parseInt(result[0]['MAX(ParcelID)'])+1;
		if(Number.isNaN(mxId)) mxId = 1; //Case first parcel
	


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
			res.status(200).send("success");
		});

	}

	})
});


module.exports = router
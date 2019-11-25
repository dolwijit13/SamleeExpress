var express = require('express')
var router = express.Router()
const connection = require('../database')
var cors = require('cors');

router.use(cors());

connection.on('error', function(err){
	console.log(err.code);
});

//Read

router.get('/:Parcel_ParcelID',(req,res) => {
	res.header("Access-Control-Allow-Origin", "*");
	/*
	const query = "SELECT e.FirstName, e.LastName, rt.ShipmentPoint, rt.Timestamp, ss.Status, rt.Employee_DeliverSSN, rt.Parcel_ParcelID, rt.ShipmentStatus_ShipmentID \
	FROM ResponseTo rt \
	INNER JOIN ShipmentStatus ss on rt.ShipmentStatus_ShipmentID = ss.ShipmentID \
	INNER JOIN Employee e on e.SSN = rt.Employee_DeliverSSN \
	WHERE rt.Parcel_ParcelID = ?";
	*/
	const query = "SELECT rt.ShipmentPoint, rt.Timestamp, ss.Status, rt.Employee_DeliverSSN, rt.Parcel_ParcelID, rt.ShipmentStatus_ShipmentID \
	FROM ResponseTo rt \
	INNER JOIN ShipmentStatus ss on rt.ShipmentStatus_ShipmentID = ss.ShipmentID \
	WHERE rt.Parcel_ParcelID = ?";
	connection.query(query,req.params.Parcel_ParcelID,(err,result) => {
		//console.log(result);
		result.sort((a,b) => (a.Timestamp > b.Timestamp) ? 1 : ((b.Timestamp > a.Timestamp) ? -1 : 0)); 
		res.json(result);
    })
});


//Delete
router.post('/delete',(req,res) => {
	res.header("Access-Control-Allow-Origin", "*");
	connection.query("DELETE FROM ResponseTo WHERE ShipmentStatus_ShipmentID = ?",[req.body.ShipmentStatus_ShipmentID],(err,result) => {
		if(!err){
			//res.json(result);
			console.log('Deleted ResponseTo ShipmentStatus_ShipmentID : ' + req.body.ShipmentStatus_ShipmentID);
		}
		else{
			console.log(err);
			//res.sendStatus(500);
			return;
		}
	})

	connection.query("DELETE FROM ShipmentStatus WHERE ShipmentID = ?",[req.body.ShipmentStatus_ShipmentID],(err,result) => {
		if(!err){
			res.json(result);
			console.log('Deleted ShipmentStatus ShipmentID : ' + req.body.ShipmentStatus_ShipmentID);
		}
		else{
			console.log(err);
			//res.sendStatus(500);
			return;
		}
	})
});


//update
router.get('/edit/:Parcel_ParcelID&:ShipmentStatus_ShipmentID', (req,res)=>{
	const Parcel_ParcelID = req.params.Parcel_ParcelID;
	const ShipmentStatus_ShipmentID = req.params.ShipmentStatus_ShipmentID;

	const query = "SELECT rt.Timestamp, rt.ShipmentPoint, ss.Status \
				FROM ResponseTo rt \
				INNER JOIN ShipmentStatus ss on rt.ShipmentStatus_ShipmentID = ss.ShipmentID\
				WHERE rt.Parcel_ParcelID = ? AND rt.ShipmentStatus_ShipmentID = ?";
	connection.query(query,[Parcel_ParcelID,ShipmentStatus_ShipmentID], (err,result)=>{
		res.json(result);
	});
	
});

router.post('/edit/:Parcel_ParcelID&:ShipmentStatus_ShipmentID', (req,res)=>{
	const Parcel_ParcelID = req.params.Parcel_ParcelID;
	const ShipmentStatus_ShipmentID = req.params.ShipmentStatus_ShipmentID;

	var {Timestamp,ShipmentPoint,Status} = req.body;

	console.log(Parcel_ParcelID);
	console.log(ShipmentStatus_ShipmentID);

	
	connection.beginTransaction(function(err){
		if ( err ) throw err;
		connection.query("UPDATE ResponseTo SET Timestamp = ?, ShipmentPoint = ? 	\
			WHERE Parcel_ParcelID = ? AND ShipmentStatus_ShipmentID = ?;",
			[Timestamp,ShipmentPoint,Parcel_ParcelID,ShipmentStatus_ShipmentID],(error,result)=>{
				if ( error ) {
					return connection.rollback(function() {
						throw error;
					});
				}
				connection.query("UPDATE ShipmentStatus SET Status = ? WHERE ShipmentID = ?;",
					[Status,ShipmentStatus_ShipmentID], (error,result)=>{
						if ( error ) {
							return connection.rollback(function() {
								throw error;
							});
						}
						connection.commit(function(err){
							if (err) {
								return connection.rollback(function() {
								  throw err;
								});
							}
							res.send("success");
							console.log("shipment status updated");
						});
					});
			});
	});
	
});


//Add
//ShipmentID,Status
//Employee_DeliverSSN,Parcel_ParcelID,ShipmentStatus_ShipmentID,ShipmentPoint,Timestamp

router.post('/add/:Employee_DeliverSSN',(req,res) => {
    const Employee_DeliverSSN = req.params.Employee_DeliverSSN;
    var mxId = 0;
	connection.query('select MAX(ShipmentStatus_ShipmentID) FROM ResponseTo;',(err,result) => {
		mxId = parseInt(result[0]['MAX(ShipmentStatus_ShipmentID)'])+1;
		if(Number.isNaN(mxId)) mxId = 1; //Case first ShipmentStatus
	


	const { Parcel_ParcelID,ShipmentPoint,Status } = req.body;
	Timestamp = new Date();
	var ShipmentStatus_ShipmentID = "" + mxId;
	const tmp=10-ShipmentStatus_ShipmentID.length;
	for(var i=1;i<=tmp;i++) ShipmentStatus_ShipmentID = "0"+ShipmentStatus_ShipmentID;
	var ResponseTo = [
        Employee_DeliverSSN,
        Parcel_ParcelID,
        ShipmentStatus_ShipmentID,
        ShipmentPoint,
        Timestamp
	]
    var ShipmentStatus = [
        ShipmentStatus_ShipmentID,
        Status
	]
	//console.log(ResponseTo);
	//console.log(ShipmentStatus);

	if(Employee_DeliverSSN == undefined || Employee_DeliverSSN == "")
	{
		res.status(507).send("Employee_DeliverSSN can't be empty");
	}
	else if(Parcel_ParcelID == undefined|| Parcel_ParcelID == "")
	{
		res.status(508).send("Parcel_ParcelID can't be empty");
    }
    else if(ShipmentStatus_ShipmentID == undefined|| ShipmentStatus_ShipmentID == "")
	{
		res.status(509).send("ShipmentStatus_ShipmentID can't be empty");
    }
    else if(ShipmentPoint == undefined|| ShipmentPoint == "")
	{
		res.status(510).send("ShipmentPoint can't be empty");
    }
	else
	{
		connection.beginTransaction(function(err){
			if ( err ) {
				res.status(403).send("internal error!");
				throw err;
			}
			var query = "INSERT INTO ResponseTo VALUES(?, ?, ?, ?, ?);";
			connection.query(query,ResponseTo,(error,result) => {
				console.log('Inserted ResponseTo Employee_DeliverSSN : '+ Employee_DeliverSSN + ' Parcel_ParcelID :'+Parcel_ParcelID+' ShipmentStatus_ShipmentID '+ShipmentStatus_ShipmentID);
				if ( error ) {
					return connection.rollback(function() {
						res,status(403).send("internal error!");
						throw error;
					});
				}
				query = "INSERT INTO ShipmentStatus VALUES(?, ?);"
				connection.query(query,ShipmentStatus,(error,result) => {
					console.log('Inserted ShipmentStatus ShipmentID : '+ Employee_DeliverSSN + ' Parcel_ParcelID :'+Parcel_ParcelID+' ShipmentStatus_ShipmentID '+ShipmentStatus_ShipmentID);
					if ( error ) {
						return connection.rollback(function() {
							res,status(403).send("internal error!");
							throw error;
						});
					}
					connection.commit(function(err){
						if (err) {
							return connection.rollback(function() {
							res,status(403).send("internal error!");
								throw err;
							});
						}
						res.send("success");
						console.log("shipment status updated");
					});
				});
			});
		});

		
        
        

	}

	})
});




module.exports = router
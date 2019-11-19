var express = require('express')
var router = express.Router()
const connection = require('../database')

//Read

router.get('/:Parcel_ParcelID',(req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
	connection.query('SELECT * FROM ResponseTo WHERE Parcel_ParcelID = ?',req.params.Parcel_ParcelID,(err,result) => {
		res.json(result);
    })
});


//Add

//ShipmentID,Status
//Employee_DeliverSSN,Parcel_ParcelID,ShipmentStatus_ShipmentID,ShipmentPoint,Timestamp

router.post('/add/:Employee_DeliverSSN',(req,res) => {
    const Employee_DeliverSSN = req.params.Employee_DeliverSSN;
    var mxId = 0;
	connection.query('select MAX(ShipmentStatus_ShipmentID) FROM ResponseTo;',(err,result) => {
		mxId = parseInt(result[0]['MAX(ShipmentStatus_ShipmentID)'])+1;
	


	const { Parcel_ParcelID,ShipmentPoint,Status } = req.body;
	Timestamp = new Date();
	var ShipmentStatus_ShipmentID = "" + mxId;
	const tmp=10-ShipmentStatus_ShipmentID.length;
	for(var i=1;i<=tmp;i++) ShipmentStatus_ShipmentID = "0"+ShipmentStatus_ShipmentID;
	const ResponseTo = {
        Employee_DeliverSSN,
        Parcel_ParcelID,
        ShipmentStatus_ShipmentID,
        ShipmentPoint,
        Timestamp
    }
    const ShipmentStatus = {
        ShipmentStatus_ShipmentID : ShipmentID,
        Status : Status
	}
	if(Employee_DeliverSSN == undefined || Employee_DeliverSSN == "")
	{
		res.status(507).send("Employee_DeliverSSN can't be empty");
	}
	else if(Parcel_ParcelID == undefined|| Parcel_ParcelID == "")
	{
		Parcel_ParcelID.status(508).send("Parcel_ParcelID can't be empty");
    }
    else if(ShipmentStatus_ShipmentID == undefined|| ShipmentStatus_ShipmentID == "")
	{
		ShipmentStatus_ShipmentID.status(509).send("ShipmentStatus_ShipmentID can't be empty");
    }
    else if(ShipmentPoint == undefined|| ShipmentPoint == "")
	{
		ShipmentPoint.status(510).send("ShipmentPoint can't be empty");
    }
	else
	{
		connection.query('INSERT INTO ResponseTo SET ?',ResponseTo,(err) => {
			console.log('Inserted ResponseTo Employee_DeliverSSN : '+ Employee_DeliverSSN + ' Parcel_ParcelID :'+Parcel_ParcelID+' ShipmentStatus_ShipmentID '+ShipmentStatus_ShipmentID);
			return res.redirect('/customer');
        });
        
        connection.query('INSERT INTO ShipmentStatus SET ?',ResponseTo,(err) => {
			console.log('Inserted ShipmentStatus ShipmentID : '+ Employee_DeliverSSN + ' Parcel_ParcelID :'+Parcel_ParcelID+' ShipmentStatus_ShipmentID '+ShipmentStatus_ShipmentID);
			return res.redirect('/customer');
		});

	}

	})
});


//*wait
//Update
router.get('/edit/:RegisterID',(req,res) => {
	
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
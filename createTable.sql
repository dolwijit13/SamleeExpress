create database SamleeExpress;
use SamleeExpress;

create table test
( 
	BranchID char(3) primary key,
	Name Text,
    FK_Control_Employee_SSN char(13)
);

create table Building
( 
	BuildingCODE char(2) primary key,
	Name Text,
    HouseNo varchar(10),
    Street Text,
    SubDistrict Text,
    District Text,
    Province Text,
    Country Text,
    PostalCode char(5),
    FK_Locate_Branch_BranchID char(3)
);

create table Department
( 
	DepartmentCODE char(2) primary key,
	Name Text,
    Budget int,
    FK_BelongTo_Branch_BranchID char(3),
    FK_Manage_Employee_SSN char(13)
);

create table Employee
( 
	SSN char(13) primary key,
	FirstName Text,
    LastName Text,
    TelephoneNo char(10),
    EMail Text,
    DateOfBirth date,
    HouseNo varchar(10),
    Street Text,
    SubDistrict Text,
    District Text,
    Province Text,
    Country Text,
    PostalCode char(5),
    StartingDate date,
    Gender char(1),
    Salary int,
    Education Text,
    Position enum("Administrator", "Deliveryman", "Stockmanage"),
    FK_Locate_Branch_BranchID char(3),
    FK_PartOf_Department_DepartmentCode char(2),
    FK_Supervise_Employee_SSN char(13)
);

create table Customer
( 
	RegisterID char(10) primary key,
	FirstName Text,
    LastName Text,
    TelephoneNo char(10),
    EMail Text,
    HouseNo varchar(10),
    Street Text,
    SubDistrict Text,
    District Text,
    Province Text,
    Country Text,
    PostalCode char(5),
    StartingDate date,
    Gender char(1)
);

create table Parcel
( 
	ParcelID char(10) primary key,
	Type Text,
    InsuranceType Text,
    HouseNo varchar(10),
    Street Text,
    SubDistrict Text,
    District Text,
    Province Text,
    Country Text,
    PostalCode char(5),
    ShipmentType Text,
    FK_Send_Customer_SenderID char(10),
    FK_Receive_Customer_ReceiverID char(10),
    FK_Store_Employee_StockSSN char(13)
);

create table ShipmentStatus
(
	ShipmentID char(10) primary key,
    Status Text
);

create table ResponseTo
(
	Employee_DeliverSSN char(13),
    Parcel_ParcelID char(10),
    ShipmentStatus_ShipmentID char(10),
    ShipmentPoint Text,
    Timestamp datetime,
    PRIMARY KEY(Employee_DeliverSSN, Parcel_ParcelID, ShipmentStatus_ShipmentID)
);

/*
drop table PARCEL;
delete From CUSTOMER where RegisterID = "2";
*/

select * from customer;
insert into CUSTOMER VALUES ("0000000001","Inuyama","Shibata","0123456789","inuyama.s@dogmail.com","1","Shiba","Inu","ShibaInu","Chiba","Japan","00000",DATE("2019-11-17"),"M");
#(RegisterID,FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,StartingDate,Gender)
#insert into CUSTOMER (FirstName,LastName) VALUES ("Bump","Dolwijit");
insert into CUSTOMER VALUES ("0000000002", "Sookjai","Painaidee","0115484652","Sookjai@hotmail.com","2","street_2","subdis_2","dis_2","Bangkok","Thailand","10800","2019-11-180","F");
select MAX(RegisterID) FROM CUSTOMER c;

select * from Parcel;
#//ParcelID,Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,ShipmentType,FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN
insert into PARCEL VALUES ("0000000001","EMS","Normal","10","street1","SubDistrict1","District1","Bangkok","Thailand","10000","Normal","0123456789","0123456789","0123456789012");
insert into PARCEL VALUES ("0000000002","EMS","Normal","10","street1","SubDistrict1","District1","Bangkok","Thailand","10000","Normal","0000000001","0000000002","1314651155100");

insert into EMPLOYEE values("1314651155100", "Somchai", "Chaidee","0451321548","somchai@hotmail.com",Date("2019-11-14"),
"1","street1","subdis1","dis1","provin1","thailand","10400",Date("2019-11-18"),"M","90000","Ph.D","Administrator",NULL,NULL,NULL);

insert into ShipmentStatus values ("0000000001", "shiped to sorting center in Zhenshen");
insert into ShipmentStatus values ("0000000002", "[THAI DC] your parcel has been received by sorting center");

insert into ResponseTo values("1314651155100","0000000002","0000000001", "Zhenshen", CURRENT_TIMESTAMP);
insert into ResponseTo values("1314651155100", "0000000002","0000000002","Bangkok Thailand", CURRENT_TIMESTAMP);
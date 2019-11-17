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
    StartingDate date,
    Gender char(1),
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
	Employee_DeliverSSN char(13) primary key,
    Parcel_ParcelID char(10),
    ShipmentStatus_ShipmentID char(10),
    ShipmentPoint Text,
    Timestamp datetime
);

select * from customer;
insert into CUSTOMER VALUES ("0000000001","Inuyama","Shibata","0123456789","inuyama.s@dogmail.com","1","Shiba","Inu","ShibaInu","Chiba","Japan","00000",DATE("2019-11-17"),"D");
#(RegisterID,FirstName,LastName,TelephoneNo,EMail,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,StartingDate,Gender)
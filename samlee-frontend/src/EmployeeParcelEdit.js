import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Login from './login2'
import EmployeeParcel from './EmployeeParcel';

class EmployeeParcelEdit extends React.Component {
    constructor(props) {
        super(props);
        console.log("props : ");
        console.log(props);
        this.state = {
            parcel: props.parcel,
            newParcel: props.parcel,
            Type: "",
            InsuranceType: "",
            HouseNo: "",
            Street: "",
            SubDistrict: "",
            District: "",
            Province: "",
            Country: "",
            PostalCode: "",
            ShipmentType: "",
            FK_Send_Customer_SenderID: this.props.senderID,
            FK_Receive_Customer_ReceiverID: "",
            FK_Store_Employee_StockSSN: this.props.stockSSN,
            addParcel: this.props.addParcel,
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    resetForm(){
        if ( this.state.addParcel ){
            this.setState({Type: "",
            InsuranceType: "",
            HouseNo: "",
            Street: "",
            SubDistrict: "",
            District: "",
            Province: "",
            Country: "",
            PostalCode: "",
            ShipmentType: "",
            FK_Receive_Customer_ReceiverID: "",
            });

        }
        else {
            this.setState({Type: this.state.parcel.Type,
            InsuranceType:  this.state.parcel.InsuranceType,
            HouseNo:  this.state.parcel.HouseNo,
            Street:  this.state.parcel.Street,
            SubDistrict:  this.state.parcel.SubDistrict,
            District:  this.state.parcel.District,
            Province:  this.state.parcel.Province,
            Country:  this.state.parcel.Country,
            PostalCode:  this.state.parcel.PostalCode,
            ShipmentType:  this.state.parcel.ShipmentType,});
        }
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if(this.isHaveSpecialChar(val)) return;
        if("PostalCode" == nam.trim())
        {
            if(val.length >5) return;
            if(this.isHaveChar(val)) return;
        }
        if("FK_Receive_Customer_ReceiverID" == nam.trim())
        {
            if(val.length >10) return;
            if(this.isHaveChar(val)) return;
        }
        this.setState({[nam]: val});
        console.log(nam, val);
    }

    componentDidMount(){
        this.resetForm();
    }

    isHaveChar(s)
    {
        var format = /[a-zA-Z]+/;

        if(format.test(s)){
        return true;
        } else {
        return false;
        }
    }

    isHaveSpecialChar(s)
    {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]+/;

        if(format.test(s)){
        return true;
        } else {
        return false;
        }
    }

//ParcelID,Type,InsuranceType,HouseNo,Street,SubDistrict,District,Province,Country,PostalCode,ShipmentType,FK_Send_Customer_SenderID,FK_Receive_Customer_ReceiverID,FK_Store_Employee_StockSSN
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.FK_Receive_Customer_ReceiverID);
        if(this.state.PostalCode < "10000" || this.state.PostalCode.length<5)
        {
            alert("Wrong Postal Code (must be 10000-99999)");
            return;
        }
        if(this.state.addParcel && this.state.FK_Receive_Customer_ReceiverID.length<10)
        {
            alert("Wrong ReceiverID (must have exactly 10 characters)");
            return;
        }
        if ( this.state.addParcel ){ //Case Add

            const data = {Type: this.state.Type,
                InsuranceType:  this.state.InsuranceType,
                HouseNo:  this.state.HouseNo,
                Street:  this.state.Street,
                SubDistrict:  this.state.SubDistrict,
                District:  this.state.District,
                Province:  this.state.Province,
                Country:  this.state.Country,
                PostalCode:  this.state.PostalCode,
                ShipmentType:  this.state.ShipmentType,
                FK_Send_Customer_SenderID: this.state.FK_Send_Customer_SenderID,
                FK_Receive_Customer_ReceiverID: this.state.FK_Receive_Customer_ReceiverID,
                FK_Store_Employee_StockSSN: this.state.FK_Store_Employee_StockSSN
            };

            
            if(data.HouseNo == null || data.HouseNo == "")
            {
                alert("HouseNo can't be empty");
            }
            else if(data.SubDistrict == null || data.SubDistrict == "")
            {
                alert("SubDistrict can't be empty");
            }
            else if(data.District == null || data.District == "")
            {
                alert("District can't be empty");
            }
            else if(data.Province == null || data.Province == "")
            {
                alert("Province can't be empty");
            }
            else if(data.PostalCode == null || data.PostalCode == "")
            {
                alert("PostalCode can't be empty");
            }
            else
            {
                const url = "http://localhost:8000/parcel/add/" + this.state.FK_Store_Employee_StockSSN;
                axios.post(url,data).then(res=>{
                    if ( res.status === 200 ){
                        console.log("success");
                        alert("parcel added!");
                    }
                }).catch(err=>{
                    console.log(err);
                });

            }
        }
        else { //Case Edit
            const data = {Type: this.state.Type,
                InsuranceType:  this.state.InsuranceType,
                HouseNo:  this.state.HouseNo,
                Street:  this.state.Street,
                SubDistrict:  this.state.SubDistrict,
                District:  this.state.District,
                Province:  this.state.Province,
                Country:  this.state.Country,
                PostalCode:  this.state.PostalCode,
                ShipmentType:  this.state.ShipmentType
            };

            if(data.HouseNo == null || data.HouseNo == "")
            {
                alert("HouseNo can't be empty");
            }
            else if(data.SubDistrict == null || data.SubDistrict == "")
            {
                alert("SubDistrict can't be empty");
            }
            else if(data.District == null || data.District == "")
            {
                alert("District can't be empty");
            }
            else if(data.Province == null || data.Province == "")
            {
                alert("Province can't be empty");
            }
            else if(data.PostalCode == null || data.PostalCode == "")
            {
                alert("PostalCode can't be empty");
            }
            else
            {
                const url = "http://localhost:8000/parcel/edit/" + this.state.parcel.ParcelID;
                axios.post(url,data).then(res=>{
                    if ( res.status === 200 ){
                        console.log("success");
                        alert("parcel updated!");
                    }
                }).catch(err=>{
                    console.log(err);
                });
            }
        }
    }

    render(){
        var parcel = this.state.parcel;
        var stage;

        if ( this.state.addParcel ){
            stage = (
                <tbody>
                    <tr>
                        <td className="parcel-detail-topic">Type</td>
                        <td><input type="text" value={this.state.Type} name="Type" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">InsuranceType</td>
                        <td><input type="text" value={this.state.InsuranceType} name="InsuranceType" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">HouseNo</td>
                        <td><input type="text" value={this.state.HouseNo} name="HouseNo" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">Street</td>
                        <td><input type="text" value={this.state.Street} name="Street" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">SubDistrict</td>
                        <td><input type="text" value={this.state.SubDistrict} name="SubDistrict" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">District</td>
                        <td><input type="text" value={this.state.District} name="District" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">Province</td>
                        <td><input type="text" value={this.state.Province} name="Province" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">Country</td>
                        <td><input type="text" value={this.state.Country} name="Country" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">PostalCode</td>
                        <td><input type="text" value={this.state.PostalCode} name="PostalCode" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">ShipmentType</td>
                        <td><input type="text" value={this.state.ShipmentType} name="ShipmentType" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">FK_Receive_Customer_ReceiverID</td>
                        <td><input type="text" value={this.state.FK_Receive_Customer_ReceiverID} name="FK_Receive_Customer_ReceiverID" onChange={this.changeHandler}/></td>
                    </tr>
                </tbody>
            );
        }
        else {
            stage = (
                <tbody>
                    <tr>
                        <td className="parcel-detail-topic">ParcelID</td>
                        <td>{parcel.ParcelID}</td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">Type</td>
                        <td><input type="text" value={this.state.Type} name="Type" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">InsuranceType</td>
                        <td><input type="text" value={this.state.InsuranceType} name="InsuranceType" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">HouseNo</td>
                        <td><input type="text" value={this.state.HouseNo} name="HouseNo" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">Street</td>
                        <td><input type="text" value={this.state.Street} name="Street" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">SubDistrict</td>
                        <td><input type="text" value={this.state.SubDistrict} name="SubDistrict" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">District</td>
                        <td><input type="text" value={this.state.District} name="District" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">Province</td>
                        <td><input type="text" value={this.state.Province} name="Province" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">Country</td>
                        <td><input type="text" value={this.state.Country} name="Country" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">PostalCode</td>
                        <td><input type="text" value={this.state.PostalCode} name="PostalCode" onChange={this.changeHandler}/></td>
                    </tr>
                    <tr>
                        <td className="parcel-detail-topic">ShipmentType</td>
                        <td><input type="text" value={this.state.ShipmentType} name="ShipmentType" onChange={this.changeHandler}/></td>
                    </tr>
                </tbody>
            );
        }

        let submitBtnText = this.state.addParcel ? "add" : "save";
        let cancelBtnText = this.state.addParcel ? "clear" : "cancel";
        var btnGroup = <div className="container d-flex flex-row justify-content-between mt-3">
                            <button className="btn btn-primary" type="submit">{submitBtnText}</button>
                            <button className="btn btn-secondary" type="button" onClick={this.resetForm}>{cancelBtnText}</button>
                        </div>

        var backBtn = <Link to="/customerParcel/"><button className="btn btn-dark">Back</button></Link>;
        var topMenu = 
        <div className="container d-flex flex-row justify-content-between mt-3">
            {backBtn}
        </div>

        return(
            <Router>
                <Switch>
                    <Route exact path="/customerParcelManage/">
                        <div className="mb-5">
                            <ul className="navbar">
                                <li className="left">SamleeExpress</li>
                                <Link to="/"><li className="right">Log out</li></Link>
                            </ul>
                            {topMenu}

                            <form onSubmit={this.handleSubmit}>
                                <div className="parcel-edit-container">
                                    <h1 className="parcel-edit-header">Manage Parcel</h1>
                                    <table className="parcel-edit-table">
                                        <thead>
                                            <tr className="parcel-edit-table-head">
                                                <th className="data-width-table">Topic</th>
                                                <th className="data-width-table">Detail</th>
                                            </tr>
                                        </thead>
                                        {stage}
                                    </table>
                                </div>
                                {btnGroup}
                            </form>
                        </div>
                    </Route>
                    <Route path="/customerParcel" component={()=><EmployeeParcel senderID={this.state.FK_Send_Customer_SenderID} ssn={this.state.FK_Store_Employee_StockSSN}/>} />
                    <Route exact path="/" component={()=><Login/>} />
                </Switch>
            </Router>
        );
    }
}

export default EmployeeParcelEdit;
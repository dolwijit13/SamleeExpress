import React from 'react';
import axios from 'axios';

class EmployeeParcelEdit extends React.Component {
    constructor(props) {
        super(props);
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
        this.setState({[nam]: val});
        console.log(nam, val);
    }

    componentDidMount(){
        this.resetForm();
    }

    handleSubmit(event){
        event.preventDefault();
        if ( this.state.addParcel ){
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
                FK_Store_Employee_StockSSN: this.state.FK_Store_Employee_StockSSN};
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
        else {
            const data = {Type: this.state.Type,
                InsuranceType:  this.state.InsuranceType,
                HouseNo:  this.state.HouseNo,
                Street:  this.state.Street,
                SubDistrict:  this.state.SubDistrict,
                District:  this.state.District,
                Province:  this.state.Province,
                Country:  this.state.Country,
                PostalCode:  this.state.PostalCode,
                ShipmentType:  this.state.ShipmentType};
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

        return(
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
        
        );
    }
}

export default EmployeeParcelEdit;
import React from 'react';

class EmployeeParcelEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parcel: props.parcel,
            newParcel: props.parcel,
            Type: null,
            InsuranceType: null,
            HouseNo: null,
            Street: null,
            SubDistrict: null,
            District: null,
            Province: null,
            Country: null,
            PostalCode: null,
            ShipmentType: null

        };
        this.changeHandler = this.changeHandler.bind(this);
    }
    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        console.log(nam, val);
    }
    render(){
        var parcel = this.state.parcel;
        var stage = (
            <tbody>
                <tr>
                    <td className="parcel-detail-topic">ParcelID</td>
                    <td>{parcel.ParcelID}</td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">Type</td>
                    <td><input type="text" defaultValue={parcel.Type} name="Type" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">InsuranceType</td>
                    <td><input type="text" defaultValue={parcel.InsuranceType} name="InsuranceType" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">HouseNo</td>
                    <td><input type="text" defaultValue={parcel.HouseNo} name="HouseNo" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">Street</td>
                    <td><input type="text" defaultValue={parcel.Street} name="Street" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">SubDistrict</td>
                    <td><input type="text" defaultValue={parcel.SubDistrict} name="SubDistrict" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">District</td>
                    <td><input type="text" defaultValue={parcel.District} name="District" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">Province</td>
                    <td><input type="text" defaultValue={parcel.Province} name="Province" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">Country</td>
                    <td><input type="text" defaultValue={parcel.Country} name="Country" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">PostalCode</td>
                    <td><input type="text" defaultValue={parcel.PostalCode} name="PostalCode" onChange={this.changeHandler}/></td>
                </tr>
                <tr>
                    <td className="parcel-detail-topic">ShipmentType</td>
                    <td><input type="text" defaultValue={parcel.ShipmentType} name="ShipmentType" onChange={this.changeHandler}/></td>
                </tr>
            </tbody>
        );
        return(
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
        );
    }
}

export default EmployeeParcelEdit;
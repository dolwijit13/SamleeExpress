import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from 'axios';

class EmployeeParcel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        parcels: null,
        error: null,
        senderID: props.senderID,
        parcelID: null,
    };
  }

  componentDidMount() {
    console.log(this.state.senderID);
    this.fetchDatas();
  }

  fetchDatas() {
    fetch('http://localhost:8000/parcel/' + this.state.senderID)
      .then(response => response.json())
      .then(data =>{
        //console.log(data);
        this.setState({
          parcels: data,
          doneLoading: true,
      })}
      )
      .catch(error => this.setState({ error, doneLoading: false }));
  }

  deleteHandler(event, parcel){
    var url = "http://localhost:8000/parcel/delete/";
    const data = {ParcelID : parcel.ParcelID};
    confirmAlert({
      title: 'Confirm to delete',
      message: "Are you sure to delete " + parcel.ParcelID + " that sent to " + parcel.HouseNo + " "+ parcel.Street + " " + parcel.SubDistrict + " " + parcel.District + " " +
        parcel.Province + " " + parcel.Country + " " + parcel.PostalCode,
      buttons:[
        {
          label: 'Yes',
          onClick: () => {
            Axios.delete(url,data);
            window.location.reload();
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  render() {
    if(!this.state.doneLoading) return null;
    var dataParcel = this.state.parcels.map((parcel,index)=>
        <tr key={index} className="parcel-table-data">
            <td>{parcel.ParcelID}</td>
            <td>{parcel.HouseNo + " "+ parcel.Street + " " + parcel.SubDistrict + " " + parcel.District}<br /> 
            {parcel.Province + " " + parcel.Country + " " + parcel.PostalCode}</td>
            <td>{parcel.Type}</td>
            <td>{parcel.InsuranceType}</td>
            <td><button onClick={
              ()=>this.props.changeParcelToEditParcel(parcel)} 
              className="btn btn-success">Edit</button></td>
            <td><button className="btn btn-primary" onClick={()=>this.props.changeParcelToShipmentStatus(parcel)}>Status</button></td>
            <td><button className="btn btn-danger" onClick={(e)=>this.deleteHandler(e,parcel)}>Delete</button></td>
        </tr>
    );
    return (
      <div className="parcel-container">
        <h1 className="parcel-header">Parcel List</h1>
        <div className="container">
          <button className="btn btn-primary" onClick={this.props.goAddParcel}>Add Parcel</button>
        </div>
        <table className="parcel-table">
            <thead>
                <tr className="parcel-table-head">
                    <th className="data-width-table">ParcelID</th>
                    <th className="data-width-table">Terminal</th>
                    <th className="data-width-table">Type</th>
                    <th className="data-width-table">InsuranceType</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {dataParcel}
            </tbody>
        </table>
      </div>
    );
  }
}
export default EmployeeParcel;
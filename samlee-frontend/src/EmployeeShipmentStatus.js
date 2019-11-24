import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from 'axios';

class EmployeeShipmentStatus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            employeeSSN: this.props.ssn,
            parcel: this.props.parcel,
            responseTos: null
        };
    }

    componentDidMount() {
        this.fetchDatas();
    }
    
    fetchDatas() {
        fetch('http://localhost:8000/shipmentStatus/' + this.state.parcel.ParcelID)
          .then(response => response.json())
          .then(data =>{
            //console.log(data);
            this.setState({
              responseTos: data,
              doneLoading: true,
          })}
          )
          .catch(error => this.setState({ error, doneLoading: false }));
      }

    deleteHandler(event,responseTo){
        var url = "http://localhost:8000/shipmentStatus/delete/";
        const data = {ShipmentStatus_ShipmentID : responseTo.ShipmentStatus_ShipmentID};
        confirmAlert({
          title: 'Confirm to delete',
          message: "Are you sure to delete status " + responseTo.Status + " of parcelID " + responseTo.Parcel_ParcelID + " at shipment point " + responseTo.ShipmentPoint,
          buttons:[
            {
              label: 'Yes',
              onClick: () => {
                Axios.post(url,data);
              }
            },
            {
              label: 'No',
            }
          ]
        });
      }

    render(){
        if ( !this.state.doneLoading ){
            return null;
        }

        var data = this.state.responseTos.map((responseTo,index)=>
        
        <tr key={index} className="parcel-table-data">
            <td width="15%">{responseTo.FirstName}</td>
            <td width="15%">{responseTo.LastName}</td>
            <td width="30%">{(new Date(responseTo.Timestamp)).toString()}</td>
            <td width="10%">{responseTo.ShipmentPoint}</td>
            <td width="30%">{responseTo.Status}</td>
            <td><button className="btn btn-primary" onClick={
                ()=>this.props.changeShipmentStatusToEditShipmentStatus({
                    Employee_DeliverSSN: responseTo.Employee_DeliverSSN,
                    Parcel_ParcelID: responseTo.Parcel_ParcelID,
                    ShipmentStatus_ShipmentID: responseTo.ShipmentStatus_ShipmentID
                })}>Edit</button></td>
            <td><button className="btn btn-danger" onClick={(e)=>this.deleteHandler(e,responseTo)}>Delete</button></td>
        </tr>
    );

        return <div className="parcel-container">
        <h1 className="parcel-header">Shipment Status List</h1>
        <div className="container">
            <button className="btn btn-primary" onClick={this.props.goAddShipmentStatus}>Add Shipment Status</button>
        </div>
        <table className="parcel-table">
            <thead>
                <tr className="parcel-table-head">
                    <th width="15%">Deliver FirstName</th>
                    <th width="15%">Deliver LastName</th>
                    <th width="30%">Date Time</th>
                    <th width="10%">Shipment Point</th>
                    <th width="30%">Shipment Status</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
        </table>
      </div>
    }
}

export default EmployeeShipmentStatus;
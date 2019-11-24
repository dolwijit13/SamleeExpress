import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Axios from 'axios';
import EmployeeShipmentStatusEdit from './EmployeeShipmentStatusEdit';
import Login from './login2'

class EmployeeShipmentStatus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            employeeSSN: this.props.ssn,
            parcel: this.props.parcel,
            responseTos: null,
            ShipmentStatus_ShipmentID: null,
            addShipmentStatus : true
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

    addHandler = (event) =>
    {
        this.setState({addShipmentStatus: true});
    }

    ShipmentStatusHandler = (event,responseTo) =>{
      console.log("pppp");
      console.log(responseTo);
      this.setState({addShipmentStatus: false, ShipmentStatus_ShipmentID:responseTo.ShipmentStatus_ShipmentID});
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
                (e)=>{this.ShipmentStatusHandler(e,responseTo)}}>Edit</button></td>
            <td><button className="btn btn-danger" onClick={(e)=>this.deleteHandler(e,responseTo)}>Delete</button></td>
        </tr>
    );
 
        return (
        
        <Router>
          <Switch>
            <Route exact path='/customerShipmentStatus/'>
              <div className="parcel-container">
                <h1 className="parcel-header">Shipment Status List</h1>
                <div className="container">
                  <Link to="/customerShipmentStatusManage/"><button className="btn btn-primary" onClick={this.addHandler}>Add Shipment Status</button></Link>
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
            </Route>
            <Route exact path="/customerShipmentStatusManage/" component={()=><EmployeeShipmentStatusEdit 
              Employee_DeliverSSN={this.state.employeeSSN} Parcel_ParcelID={this.state.parcel.ParcelID}
              ShipmentStatus_ShipmentID = {this.state.ShipmentStatus_ShipmentID} addShipmentStatus={this.state.addShipmentStatus}/>}/>
            <Route exact path="/customerParcel/" component={()=><Login />} />
            <Route exact path="/" component={()=><Login/>} />
        </Switch>
      </Router>
      )
    }
}

export default EmployeeShipmentStatus;
import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Axios from 'axios';
import EmployeeShipmentStatusEdit from './EmployeeShipmentStatusEdit';
import Login from './login2'
import EmployeeParcel from './EmployeeParcel';

class EmployeeShipmentStatus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            employeeSSN: this.props.employeeSSN,
            parcelID: this.props.parcelID,
            responseTos: null,
            ShipmentStatus_ShipmentID: null,
            addShipmentStatus : true,
            senderID: this.props.senderID,
            isDeleted : true //true for first render
        };
    }

    componentDidMount() {
        this.fetchDatas();
    }
    
    fetchDatas() {
        fetch('http://localhost:8000/shipmentStatus/' + this.state.parcelID)
          .then(response => response.json())
          .then(data =>{
            //console.log(data);
            this.setState({
              responseTos: data,
              doneLoading: true,
              isDeleted: false
          })}
          )
          .catch(error => this.setState({ error, doneLoading: false }));
      }

    deleteHandler(event,responseTo){
        var url = "http://localhost:8000/shipmentStatus/delete/";
        const data = {ShipmentStatus_ShipmentID : responseTo.ShipmentStatus_ShipmentID};
        confirmAlert({
          title: 'Confirm to delete',
          message: "Are you sure to delete status " + responseTo.Status + " of ShipmentID " + responseTo.ShipmentStatus_ShipmentID + " at shipment point " + responseTo.ShipmentPoint,
          buttons:[
            {
              label: 'Yes',
              onClick: () => {
                Axios.post(url,data)
                .then(() => this.setState({isDeleted:true}));
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
      this.setState({addShipmentStatus: false, ShipmentStatus_ShipmentID:responseTo.ShipmentStatus_ShipmentID});
    }

    componentWillUpdate(nextProps, nextState)
    {
      this.fetchDatas()
    }


    shouldComponentUpdate(nextProps, nextState)
    {
      if(this.state.isDeleted) return true;
      if(nextState.isDeleted) return true;
      return false;
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
              <td><Link to="/customerShipmentStatusManage/"><button className="btn btn-primary" onClick={
                  (e)=>{this.ShipmentStatusHandler(e,responseTo)}}>Edit</button></Link></td>
              <td><button className="btn btn-danger" onClick={(e)=>this.deleteHandler(e,responseTo)}>Delete</button></td>
          </tr>
        );

        var addBtn = 
        <Link to="/customerShipmentStatusManage/"><button className="btn btn-primary" onClick={this.addHandler}>Add Shipment Status</button></Link>
        var search = 
          <div className="search form-inline">
            <input className="form-control mr-1" type="text" placeholder="Search.." />
            <button className="btn btn-outline-primary" type="submit">search</button>
          </div>;
        var backBtn = <Link to="/customerParcel"><button className="btn btn-dark">Back</button></Link>;
        var topMenu = 
          <div className="container d-flex flex-row justify-content-between mt-3">
            {backBtn}
            {search}
            {addBtn}
          </div>
 
        return (
        
        <Router>
          <Switch>
            <Route exact path='/customerShipmentStatus/'>

            <div className="mb-5">
              <ul>
                <li className="left"><a>SamleeExpress</a></li>
                <Link to="/"><li className="right"><a>Log out</a></li></Link>
              </ul>

              {topMenu}

              <div className="parcel-container">
                <h1 className="parcel-header">Shipment Status List</h1>
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
            </div>
            </Route>
            <Route exact path="/customerShipmentStatusManage/" component={()=><EmployeeShipmentStatusEdit 
              Employee_DeliverSSN={this.state.employeeSSN} Parcel_ParcelID={this.state.parcelID} senderID={this.state.senderID}
              ShipmentStatus_ShipmentID = {this.state.ShipmentStatus_ShipmentID} addShipmentStatus={this.state.addShipmentStatus}/>}/>
            <Route exact path="/customerParcel/" component={()=><EmployeeParcel senderID={this.state.senderID} ssn={this.state.employeeSSN} />} />
            <Route exact path="/" component={()=><Login/>} />
        </Switch>
      </Router>
      )
    }
}

export default EmployeeShipmentStatus;
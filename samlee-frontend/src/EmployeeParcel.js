import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from 'axios';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Login from './login2'
import EmployeeParcelEdit from './EmployeeParcelEdit';
import EmployeeCustomer from './EmployeeCustomer';

class EmployeeParcel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        parcels: null,
        error: null,
        senderID: this.props.senderID,
        parcelID: null,
        employeeSSN: this.props.ssn,
        parcel: null,
        addParcel: false,
    };
  }

  componentDidMount() {
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
            Axios.post(url,data);
            window.location.reload();
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  addHandler = (event) =>{
    this.setState({addParcel: true});
  }

  render() {
    var addBtn = 
      <Link to="/customerParcelManage/"><button className="btn btn-dark" onClick={this.addHandler}>Add Parcel</button></Link>;
    
    var search = 
      <div className="search form-inline">
        <input className="form-control mr-1" type="text" placeholder="Search.." />
        <button className="btn btn-outline-primary" type="submit">search</button>
      </div>;
    var backBtn = <Link to="/customerList"><button className="btn btn-dark">Back</button></Link>;
    var topMenu = 
      <div className="container d-flex flex-row justify-content-between mt-3">
        {backBtn}
        {search}
        {addBtn}
      </div>
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
      <Router>
        <Switch>
          <Route exact path='/customerParcel/'>
      <div className="mb-5">
        <ul>
          <li className="left"><a>SamleeExpress</a></li>
          <Link to="/"><li className="right"><a>Log out</a></li></Link>
        </ul>
      {topMenu}
      <div className="parcel-container">
        <h1 className="parcel-header">Parcel List</h1>
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
      </div>
      </Route>
      <Route exact path="/customerParcelManage/" component={()=><EmployeeParcelEdit parcel={this.state.parcel}
          senderID={this.state.senderID} stockSSN={this.state.employeeSSN} addParcel = {this.state.addParcel}/>}/>
      <Route exact path="/customerList/" component={()=><EmployeeCustomer ssn={this.state.employeeSSN} />} />
      <Route exact path="/" component={()=><Login/>} />
      </Switch>
      </Router>
    );
  }
}
export default EmployeeParcel;
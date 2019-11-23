import React from 'react';
import EmployeeCustomerUpdate from './EmployeeCustomerUpdate';
import EmployeeParcel from './EmployeeParcel';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
  

class EmployeeCustomer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        customers: null,
        error: null,
        employeeSSN: this.props.ssn,
        goToEmpCusUpt: false,
        customerID: null,
    };
  }

  fetchDatas() {
    fetch('http://localhost:8000/customer')
      .then(response => response.json())
      .then(data =>{
        this.setState({
          customers: data,
          doneLoading: true,
          customerID: data.RegisterID,
      })}
      )
      .catch(error => this.setState({ error, doneLoading: false }));
  }

  componentDidMount(){
    this.fetchDatas();
  }

  deleteHandler(event, person){
    var url = "http://localhost:8000/customer/delete/";
    const data = {RegisterID : person.RegisterID};
    confirmAlert({
      title: 'Confirm to delete',
      message: "Are you sure to delete " + person.FirstName + " " + person.LastName,
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
    this.setState({goToEmpCusUpt: true});
  }

  render() {
    var EmpCusUptManage = null;
    if(this.state.goToEmpCusUpt)  EmpCusUptManage = <Redirect to="/customerManage/"/>;  
    var addBtn = <button className="btn btn-dark" onClick={this.addHandler}>Add Customer</button>;
    
    var search = 
      <div className="search form-inline">
        <input className="form-control mr-1" type="text" placeholder="Search.." />
        <button className="btn btn-outline-primary" type="submit">search</button>
      </div>;
    var topMenu = 
      <div className="container d-flex flex-row justify-content-between mt-3">
        {addBtn}
        {search}
      </div>
    if(!this.state.doneLoading) return null;
    var dataCustomer = this.state.customers.map((customer,index)=>
        <tr key={index} className="customer-table-data">
            <td>{customer.RegisterID}</td>
            <td>{customer.FirstName}</td>
            <td>{customer.LastName}</td>
            <td><button onClick={
              ()=>this.props.changeCustomerToParcel(customer.RegisterID)} 
              className="btn btn-success">Parcel</button></td>
            <td><button onClick={
              ()=>this.props.changeCustomerToUpdateCustomer(customer.RegisterID)} 
              className="btn btn-primary">Edit Customer</button></td>
            <td><button className="btn btn-danger" onClick={(e) => this.deleteHandler(e,customer)}>Delete</button></td>
        </tr>
    );
    return (
      <Router>
        <Switch>
          <Route exact path='/customerList/'>
      <div className="mb-5">
        <ul>
          <li className="left"><a>SamleeExpress</a></li>
          <li className="right"><a>Log out</a></li>
        </ul>
      {topMenu}
      <div className="customer-container">
        <h1 className="customer-header">Customer List</h1>
        <table className="customer-table">
            <thead>
                <tr className="customer-table-head">
                    <th className="data-width-table">RegisterID</th>
                    <th className="data-width-table">First name</th>
                    <th className="data-width-table">Last name</th>
                    <th className="link-width-table"></th>
                    <th className="link-width-table"></th>
                    <th className="link-width-table"></th>
                </tr>
            </thead>
            <tbody>
                {dataCustomer}
            </tbody>
        </table>
      </div>
      </div>
      {EmpCusUptManage}
          </Route>
          <Route path="/customerManage/" component={()=><EmployeeCustomerUpdate customerID={this.state.customerID} ssn={this.state.employeeSSN}/>} />
        </Switch>
      </Router>
    );
  }
}
export default EmployeeCustomer;
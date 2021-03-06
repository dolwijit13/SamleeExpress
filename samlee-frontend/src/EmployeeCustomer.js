import React from 'react';
import EmployeeCustomerUpdate from './EmployeeCustomerUpdate';
import EmployeeParcel from './EmployeeParcel';
import Login from './login2';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import Axios from 'axios';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
  

class EmployeeCustomer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        customers: null,
        error: null,
        employeeSSN: this.props.ssn,
        customerID: null,
        addCustomer: false,
        editCustomer: true,
        isDeleted: true //For first render
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
          isDeleted:false
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
            Axios.post(url,data)
            .then(()=>this.setState({isDeleted:true}))
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  addHandler = (event) =>{
    this.setState({addCustomer: true});
  }

  updateHandler = (event,customer) => {
    this.setState({customerID: customer.RegisterID});
  }

  parcelHandler = (event,customer) => {
    this.setState({customerID: customer.RegisterID});
  }

  componentWillUpdate(nextProps, nextState)
  {
    this.fetchDatas()
  }


  shouldComponentUpdate(nextProps, nextState)
  {
    if(nextState.isDeleted) return true;
    if(this.state.isDeleted) return true;
    return false;
  }


  render() {
    console.log("render");
    var addBtn = 
      <Link to="/customerManage/"><button className="btn btn-dark" onClick={this.addHandler}>Add Customer</button></Link>;
    
    var search = 
      <div className="search form-inline">
        <input className="form-control mr-1" type="text" placeholder="Search.." />
        <button className="btn btn-outline-primary" type="submit">search</button>
      </div>;
    var topMenu = 
      <div className="container d-flex flex-row justify-content-between mt-3">
        {search}
        {addBtn}
      </div>
    if(!this.state.doneLoading) return null;
    var dataCustomer = this.state.customers.map((customer,index)=>
        <tr key={index} className="customer-table-data">
            <td>{customer.RegisterID}</td>
            <td>{customer.FirstName}</td>
            <td>{customer.LastName}</td>
            <td><Link to="/customerParcel/"><button onClick={(e)=>this.parcelHandler(e,customer)} className="btn btn-success">Parcel</button></Link></td>
            <td><Link to="/customerManage/"><button onClick={(e)=>this.updateHandler(e,customer)} 
              className="btn btn-primary">Edit Customer</button></Link></td>
            <td><button className="btn btn-danger" onClick={(e) => this.deleteHandler(e,customer)}>Delete</button></td>
        </tr>
    );
    return (
      <Router>
        <Switch>
        <Route exact path="/" component = {()=> <Login/> }/>
        <Route exact path='/customerList/'>
          <div className="mb-5">
            <ul className="navbar">
              <li className="left">SamleeExpress</li>
              <Link to="/"><li className="right">Log out</li></Link>
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
        </Route>
        <Route exact path="/customerManage/" component={()=><EmployeeCustomerUpdate customerID={this.state.customerID} ssn={this.state.employeeSSN} addCustomer={this.state.addCustomer} />} />
        <Route exact path="/customerParcel/" component={()=><EmployeeParcel senderID={this.state.customerID} ssn={this.state.employeeSSN} />} />
        </Switch>
      </Router>
    );
  }
}
export default EmployeeCustomer;
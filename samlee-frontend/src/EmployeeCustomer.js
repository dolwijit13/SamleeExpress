import React from 'react';
import EmployeeParcel from './EmployeeParcel';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
  

class EmployeeCustomer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        customers: null,
        error: null,
        gotoParcelPage: false,
        gotoEditPage: false,
        customerID: null,
    };
  }

  fetchDatas() {
    fetch('http://localhost:8000/customer')
      .then(response => response.json())
      .then(data =>{
        //console.log(data);
        this.setState({
          customers: data,
          doneLoading: true,
      })}
      )
      .catch(error => this.setState({ error, doneLoading: false }));
  }

  componentDidMount(){
    this.fetchDatas();
  }

  deleteHandler(event, person){
    var data = {
      id: person.RegisterID
    }
    confirmAlert({
      title: 'Confirm to delete',
      message: "Are you sure to delete " + person.FirstName + " " + person.LastName,
      buttons:[
        {
          label: 'Yes',
          onClick: () => {
            fetch('http://localhost:8000/customer/delete',{
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data)
            }).then(response => response.JSON).then(function(data){}),
            alert('Click Yes')
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
    );
  }
}
export default EmployeeCustomer;
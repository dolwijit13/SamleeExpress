import React from 'react';
import EmployeeCustomer from './EmployeeCustomer';
import EmployeeParcel from './EmployeeParcel';
import EmployeeParcelUpdate from './EmployeeParcelUpdate';
import EmployeeCustomerUpdate from './EmployeeCustomerUpdate';
import './Employee.css';

class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onCustomerPage: true,
      onCustomerEditPage: false,
      onParcelPage: false,
      onParcelUpdatePage: false,
      customerID: null,
      parcelID: null,
    };
    this.changeCustomerToParcel = this.changeCustomerToParcel.bind(this);
    this.changeParcelToUpdateParcel = this.changeParcelToUpdateParcel.bind(this);
    this.changeUpdateParcelToParcel = this.changeUpdateParcelToParcel.bind(this);
    this.changeCustomerToUpdateCustomer = this.changeCustomerToUpdateCustomer.bind(this);
  }

  changeCustomerToUpdateCustomer(customerID){
    this.setState({onCustomerPage: false, onCustomerEditPage: true, customerID: customerID});
  }

  changeCustomerToParcel(customerID){
    this.setState({onCustomerPage: false, onParcelPage: true, customerID: customerID});
  }

  changeParcelToUpdateParcel(parcelID) {
    this.setState({onParcelPage: false, onParcelUpdatePage: true, parcelID: parcelID});
  }

  changeUpdateParcelToParcel(){
    this.setState({onParcelUpdatePage: false, onParcelPage: true, parcelID: null});
  }

  render() {
    var search = (this.state.onParcelUpdatePage?null:
      <div className="search">
        <input type="text" placeholder="Search.." />
        <button type="submit">search</button>
      </div>);
    var stage;
    if(this.state.onCustomerPage)  stage = <EmployeeCustomer changeCustomerToParcel={this.changeCustomerToParcel} changeCustomerToUpdateCustomer={this.changeCustomerToUpdateCustomer}/>;
    else if (this.state.onCustomerEditPage) stage = <EmployeeCustomerUpdate customerID={this.state.customerID}/>;
    else if(this.state.onParcelPage) stage = <EmployeeParcel senderID={this.state.customerID} changeParcelToUpdateParcel={this.changeParcelToUpdateParcel}/>;
    else if(this.state.onParcelUpdatePage) stage = <EmployeeParcelUpdate senderID={this.state.customerID} parcelID={this.state.parcelID} changeUpdateParcelToParcel={this.changeUpdateParcelToParcel} />;
    return (
      <div>
        <ul>
          <li className="left"><a>SamleeExpress</a></li>
          <li className="right"><a>Log out</a></li>
        </ul>
        {search}
        {stage}
      </div>
    );
  }
}
export default Employee;
import React from 'react';
import EmployeeCustomer from './EmployeeCustomer';
import EmployeeParcel from './EmployeeParcel';
import EmployeeCustomerUpdate from './EmployeeCustomerUpdate';
import EmployeeParcelEdit from './EmployeeParcelEdit';
import EmployeeEdit from './EmployeeEdit';
import './Employee.css';

class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onCustomerPage: true,
      onCustomerEditPage: false,
      onEmployeeEditPage: false,
      onParcelPage: false,
      onParcelEditPage: false,
      customerID: null,
      parcel: null,
      SSN: "1314651155100"
    };
    this.changeCustomerToParcel = this.changeCustomerToParcel.bind(this);
    this.changeCustomerToUpdateCustomer = this.changeCustomerToUpdateCustomer.bind(this);
    this.changeParcelToEditParcel = this.changeParcelToEditParcel.bind(this);
    this.changeEditParcelToParcel = this.changeEditParcelToParcel.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
<<<<<<< HEAD
=======
    this.backMenu = this.backMenu.bind(this);
>>>>>>> 36f50d941f87ca96d9e9efbcb39e319dcb278279
  }

  changeCustomerToUpdateCustomer(customerID){
    this.setState({onCustomerPage: false, onCustomerEditPage: true, customerID: customerID});
  }

  changeCustomerToParcel(customerID){
    this.setState({onCustomerPage: false, onParcelPage: true, customerID: customerID});
  }

  changeParcelToEditParcel(parcel) {
    this.setState({onParcelPage: false, onParcelEditPage: true, parcel: parcel});
  }

  changeEditParcelToParcel(){
    this.setState({onParcelEditPage: false, onParcelPage: true, parcel: null});
  }

  editEmployee(){
    this.setState({
      onCustomerPage: false,
      onCustomerEditPage: false,
      onEmployeeEditPage: true,
      onParcelPage: false,
      onParcelEditPage: false,
      customerID: null,
      parcel: null
    });
  }

<<<<<<< HEAD
=======
  backMenu(){
    if(this.state.onCustomerEditPage) this.setState({onCustomerEditPage: false, onCustomerPage: true});
    else if(this.state.onEmployeeEditPage)  this.setState({onEmployeeEditPage: false, onCustomerPage: true});
    else if(this.state.onParcelPage) this.setState({onParcelPage: false, onCustomerPage: true});
    else if(this.state.onParcelEditPage) this.setState({onParcelEditPage: false, onParcelPage: true});
  }

>>>>>>> 36f50d941f87ca96d9e9efbcb39e319dcb278279
  render() {
    var editEmployee = <button className="btn btn-outline-primary" onClick={this.editEmployee}>Edit Your Infomation</button>;
    var search = (this.state.onParcelEditPage?null:
      <div className="search form-inline">
        <input className="form-control mr-1" type="text" placeholder="Search.." />
        <button className="btn btn-outline-primary" type="submit">search</button>
      </div>);
<<<<<<< HEAD
    var topMenu = 
      <div className="container d-flex flex-row justify-content-between mb-3">
=======
    var backBtn = <button className="btn btn-dark" onClick={this.backMenu}>Back</button>
    var topMenu = 
      <div className="container d-flex flex-row justify-content-between mb-3">
        {backBtn}
>>>>>>> 36f50d941f87ca96d9e9efbcb39e319dcb278279
        {search}
        {editEmployee}
      </div>

    var stage;
    if(this.state.onCustomerPage)  stage = <EmployeeCustomer changeCustomerToParcel={this.changeCustomerToParcel} changeCustomerToUpdateCustomer={this.changeCustomerToUpdateCustomer}/>;
    else if (this.state.onCustomerEditPage) stage = <EmployeeCustomerUpdate customerID={this.state.customerID}/>;
    else if(this.state.onParcelPage) stage = <EmployeeParcel senderID={this.state.customerID} changeParcelToEditParcel={this.changeParcelToEditParcel}/>;
    else if(this.state.onParcelEditPage) stage = <EmployeeParcelEdit senderID={this.state.customerID} parcel={this.state.parcel} changeEditParcelToParcel={this.changeEditParcelToParcel} />;
    else if ( this.state.onEmployeeEditPage) stage = <EmployeeEdit SSN={this.state.SSN}/>;
    return (
      <div className="mb-5">
        <ul>
          <li className="left"><a>SamleeExpress</a></li>
          <li className="right"><a>Log out</a></li>
        </ul>
        {topMenu}
        {stage}
      </div>
    );
  }
}
export default Employee;
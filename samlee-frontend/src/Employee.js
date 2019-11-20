import React from 'react';
import EmployeeCustomer from './EmployeeCustomer';
import EmployeeParcel from './EmployeeParcel';
import EmployeeParcelEdit from './EmployeeParcelEdit';
import './Employee.css';

class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onCustomerPage: true,
      onCustomerEditPage: false,
      onParcelPage: false,
      onParcelEditPage: false,
      customerID: null,
      parcel: null
    };
    this.changeCustomerToParcel = this.changeCustomerToParcel.bind(this);
    this.changeParcelToEditParcel = this.changeParcelToEditParcel.bind(this);
    this.changeEditParcelToParcel = this.changeEditParcelToParcel.bind(this);
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

  render() {
    var search = (this.state.onParcelEditPage?null:
      <div className="search">
        <input type="text" placeholder="Search.." />
        <button type="submit">search</button>
      </div>);
    var stage;
    if(this.state.onCustomerPage)  stage = <EmployeeCustomer changeCustomerToParcel={this.changeCustomerToParcel}/>;
    else if(this.state.onParcelPage) stage = <EmployeeParcel senderID={this.state.customerID} changeParcelToEditParcel={this.changeParcelToEditParcel}/>;
    else if(this.state.onParcelEditPage) stage = <EmployeeParcelEdit senderID={this.state.customerID} parcel={this.state.parcel} changeEditParcelToParcel={this.changeEditParcelToParcel} />;
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
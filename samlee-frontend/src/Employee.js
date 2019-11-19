import React from 'react';
import EmployeeCustomerTable from './EmployeeCustomerTable';
import './Employee.css';

class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
    
  }

  render() {
    return (
      <div>
        <ul>
          <li className="left"><a>SamleeExpress</a></li>
          <li className="right"><a>Log out</a></li>
        </ul>
        <div className="search">
          <input type="text" placeholder="Search.." />
          <button type="submit">search</button>
        </div>
        <div className="customer-table-container">
          <EmployeeCustomerTable />
        </div>
      </div>
    );
  }
}
export default Employee;
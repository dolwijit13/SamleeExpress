import React from 'react';
import EmployeeParcel from './EmployeeParcel'; 

class Employee extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        customers: null,
        error: null,
        gotoParcelPage: false,
        gotoEditPage: false,
    };
  }

  fetchDatas() {
    fetch('http://localhost:8000/customer')
      .then(response => response.json())
      .then(data =>{
        console.log(data);
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

  render() {
    if(this.state.gotoParcelPage) return <EmployeeParcel />
    if(!this.state.doneLoading) return null;
    var dataCustomer = this.state.customers.map((customer,index)=>
        <tr key={index} className="customer-table-data">
            <td>{customer.RegisterID}</td>
            <td>{customer.FirstName}</td>
            <td>{customer.LastName}</td>
            <td><button onClick={()=>this.setState({gotoParcelPage:true})} className="parcel">Parcel</button></td>
            <td><button className="edit">Edit Customer</button></td>
            <td><button className="delete">Delete</button></td>
        </tr>
    );
    return (
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
    );
  }
}
export default Employee;
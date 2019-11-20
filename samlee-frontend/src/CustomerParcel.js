import React from 'react';
import EmployeeParcel from './EmployeeParcel';
  

class CustomerParcel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        parcel: null,
        error: null,
        gotoParcelPage: false,
        parcelID: null,
    };
  }

  fetchDatas() {
    fetch('http://localhost:8000/parcel/'+ this.state.senderID)
      .then(response => response.json())
      .then(data =>{
        //console.log(data);
        this.setState({
          parcel: data,
          doneLoading: true,
      })}
      )
      .catch(error => this.setState({ error, doneLoading: false }));
  }

  componentDidMount(){
    console.log(this.state.senderID);
    this.fetchDatas();
  }

  render() {
    if(!this.state.doneLoading) return null;
    var dataParcel = this.state.parcels.map((parcel,index)=>
        <tr key={index} className="parcel-table-data">
            <td>{parcel.ParcelID}</td>
            <td>{parcel.HouseNo + " "+ parcel.Street + " " + parcel.SubDistrict + " " + parcel.District}<br /> 
            {parcel.Province + " " + parcel.Country + " " + parcel.PostalCode}</td>
            <td>{parcel.Type}</td>
            <td>{parcel.InsuranceType}</td>
            <td><button onClick={
              ()=>this.props.changeToParcelPage(parcel)} 
              className="edit-parcel">Edit Parcel</button></td>
        </tr>
    );
    return (
      <div className="customer-container">
        <h1 className="customer-header">Customer List</h1>
        <table className="customer-table">
            <thead>
                <tr className="customer-table-head">
                    <th className="data-width-table">ParcelID</th>
                </tr>
            </thead>
            <tbody>
                {dataParcel}
            </tbody>
        </table>
      </div>
    );
  }
}
export default CustomerParcel;
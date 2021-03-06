import React from 'react';

class ParcelPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        parcels: null,
        error: null,
        senderID: props.senderID,
        parcelID: null,
    };
  }

  componentDidMount() {
    console.log(this.state.senderID);
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

  render() {
    if(!this.state.doneLoading) return null;
    var dataParcel = this.state.parcels.map((parcel,index)=>
        <tr key={index} className="parcel-table-data">
            <td>{parcel.ParcelID}</td>
            <td>{parcel.HouseNo + " "+ parcel.Street + " " + parcel.SubDistrict + " " + parcel.District}<br /> 
            {parcel.Province + " " + parcel.Country + " " + parcel.PostalCode}</td>
            <td>{parcel.Type}</td>
            <td>{parcel.InsuranceType}</td>
        </tr>
    );
    return (
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
export default ParcelPage;
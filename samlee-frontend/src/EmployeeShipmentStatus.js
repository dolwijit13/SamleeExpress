import React from 'react';

class EmployeeShipmentStatus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            parcel: this.props.parcel,
            responseTos: null
        };
    }

    componentDidMount() {
        this.fetchDatas();
    }
    
    fetchDatas() {
        fetch('http://localhost:8000/shipmentStatus/' + this.state.parcel.ParcelID)
          .then(response => response.json())
          .then(data =>{
            //console.log(data);
            this.setState({
              responseTos: data,
              doneLoading: true,
          })}
          )
          .catch(error => this.setState({ error, doneLoading: false }));
      }

    render(){
        if ( !this.state.doneLoading ){
            return null;
        }

        var dataParcel = this.state.responseTos.map((responseTo,index)=>
        <tr key={index} className="parcel-table-data">
            <td>{responseTo.FirstName}</td>
            <td>{responseTo.LastName}</td>
            <td>{responseTo.ShipmentPoint}</td>
            <td>{responseTo.Status}</td>
        </tr>
    );

        return <div className="parcel-container">
        <h1 className="parcel-header">Parcel List</h1>
        <table className="parcel-table">
            <thead>
                <tr className="parcel-table-head">
                    <th className="data-width-table">Deliver FirstName</th>
                    <th className="data-width-table">Deliver LastName</th>
                    <th className="data-width-table">Shipment Point</th>
                    <th className="data-width-table">Shipment Status</th>
                </tr>
            </thead>
            <tbody>
                {dataParcel}
            </tbody>
        </table>
      </div>
    }
}

export default EmployeeShipmentStatus;
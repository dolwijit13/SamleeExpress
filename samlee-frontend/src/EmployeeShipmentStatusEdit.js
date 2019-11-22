import React from 'react';
import axios from 'axios';

class EmployeeShipmentStatusEdit extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            responseToKey: this.props.responseToKey,
            data: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatDateTimeLocal = this.formatDateTimeLocal.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    fetchDatas() {
        const url = 'http://localhost:8000/shipmentStatus/edit/' + this.state.responseToKey.Employee_DeliverSSN
        + '&' + this.state.responseToKey.Parcel_ParcelID
        + '&' + this.state.responseToKey.ShipmentStatus_ShipmentID;
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            this.setState({
                data: data[0],
                doneLoading: true
            })}
        )
        .catch(error => this.setState({ error, doneLoading: false }));
    }

    componentDidMount() {
        this.fetchDatas();
    }
    
    formatDateTimeLocal(dt){
        let current_datetime = new Date(dt)
        let year = current_datetime.getFullYear();
        let month = current_datetime.getMonth() + 1;
        let date = current_datetime.getDate();
        let hour = current_datetime.getHours();
        let minute = current_datetime.getMinutes();

        if ( month < 10 ) month = '0'+month;
        if ( date < 10 ) date = '0'+date;
        if ( hour < 10 ) hour = '0'+hour;
        if ( minute < 10 ) minute = '0'+minute;

        let formatted_date = year + "-" + month + "-" + date + "T" + hour + ":" + minute;
        console.log(formatted_date)
        return formatted_date;
    }

    resetForm(){
        this.fetchDatas();
    }

    handleChange(event){
        const data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({
            data: data
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const data = this.state.data;
        const url = 'http://localhost:8000/shipmentStatus/edit/' + this.state.responseToKey.Employee_DeliverSSN
        + '&' + this.state.responseToKey.Parcel_ParcelID
        + '&' + this.state.responseToKey.ShipmentStatus_ShipmentID;
        axios.post(url, data).then((res)=>{
            if ( res.status === 200 ){
                console.log("success");
                alert("shipment status updated!");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    render(){

        if ( !this.state.doneLoading ){
            return null;
        }

        var items = [];
        for(var key in this.state.responseToKey){
            items.push(<div key={key} className="form-group">
                <label className="font-weight-bold" htmlFor={key}>{key}</label>
                <input className="form-control" type="text" id={key} name={key} defaultValue={this.state.responseToKey[key]} disabled></input>
            </div>);
        }

        return <div className="container mt-5">
            <h1 className="text-center">Edit Shipment Status</h1>
            <form onSubmit={this.handleSubmit}>
                {items}
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="Timestamp">Date Time</label>
                    <input id="Timestamp" name="Timestamp" className="form-control" type="datetime-local" value={this.formatDateTimeLocal(this.state.data.Timestamp)} onChange={this.handleChange}></input>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="ShipmentPoint">Shipment Point</label>
                    <input id="ShipmentPoint" name="ShipmentPoint" className="form-control" type="text" value={this.state.data.ShipmentPoint} onChange={this.handleChange}></input> 
                </div>
                <div className="form-group">
                    <label className="font-weight-bold" htmlFor="Status">Status</label>
                    <input id="Status" name="Status" className="form-control" type="text" value={this.state.data.Status} onChange={this.handleChange}></input> 
                </div>
            <div className="d-flex flex-row justify-content-between">
                <button class="btn btn-primary" type="submit">save</button>
                <button className="btn btn-secondary" type="button" onClick={this.resetForm}>cancel</button>
            </div>
        </form>
        </div>
        
    }
}

export default EmployeeShipmentStatusEdit;
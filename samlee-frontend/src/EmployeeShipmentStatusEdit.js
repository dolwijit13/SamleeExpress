import React from 'react';
import axios from 'axios';

class EmployeeShipmentStatusEdit extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            // responseToKey: this.props.responseToKey,
            parcel: this.props.parcel,
            data: {
                Timestamp: null,
                ShipmentPoint: null,
                Status: null,
                Employee_DeliverSSN: this.props.Employee_DeliverSSN,
                Parcel_ParcelID: this.props.Parcel_ParcelID,
                ShipmentStatus_ShipmentID: this.props.ShipmentStatus_ShipmentID
            },
            addShipmentStatus: this.props.addShipmentStatus
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatDateTimeLocal = this.formatDateTimeLocal.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    fetchDatas() {
        if ( this.state.addShipmentStatus ) //Case Add
        {
            var data = this.state.data;
            data["Timestamp"] = new Date();
            data["ShipmentPoint"] = null;
            data["Status"]=null;
            
            this.setState({
                data : data,
                doneLoading: true
            });
        }
        else { //Case Edit
            const url = 'http://localhost:8000/shipmentStatus/edit/' + this.state.data.Parcel_ParcelID
            + '&' + this.state.data.ShipmentStatus_ShipmentID;
            fetch(url)
            .then(response => response.json())
            .then(data =>{
                var data0 = this.state.data;
                data0["Timestamp"] = data[0].Timestamp;
                data0["ShipmentPoint"] = data[0].ShipmentPoint;
                data0["Status"]=data[0].Status;
                this.setState({
                    data: data0,
                    doneLoading: true
                })}
            )
            .catch(error => this.setState({ error, doneLoading: false }));
        }
        
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
        //console.log(formatted_date)
        return formatted_date;
    }

    resetForm(){
        this.fetchDatas();
    }

    handleChange(event){
        const data = this.state.data;
        data[event.target.name] = event.target.value;  
        this.setState({
            data: data,
        });
    }

    handleSubmit(event){
        if ( !this.state.addShipmentStatus ){ //Case edit
            event.preventDefault();
            const data = this.state.data;
            if(data.Timestamp === null || data.Timestamp == "")
            {
                alert("Date Time can't be empty");
            }
            else if(data.ShipmentPoint === null || data.ShipmentPoint == "")
            {
                alert("Shipment Point can't be empty");
            }
            else if(data.Status === null || data.Status == "")
            {
                alert("Status can't be empty");
            }
            else
            {
                const url = 'http://localhost:8000/shipmentStatus/edit/' + this.state.data.Parcel_ParcelID
                + '&' + this.state.data.ShipmentStatus_ShipmentID;
                axios.post(url, data).then((res)=>{
                    if ( res.status === 200 ){
                        console.log("success");
                        alert("shipment status updated!");
                    }
                    else {
                        console.log("something wrong!");
                        alert("something went wrong! please try again later.");
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            }
        }
        else { //Case add
            event.preventDefault();
            const data = this.state.data;
            //console.log(data);

            if(data.Timestamp === null || data.Timestamp == "")
            {
                alert("Date Time can't be empty");
            }
            else if(data.ShipmentPoint === null || data.ShipmentPoint == "")
            {
                alert("Shipment Point can't be empty");
            }
            else if(data.Status === null || data.Status == "")
            {
                alert("Status can't be empty");
            }
            else
            {

                const url = 'http://localhost:8000/shipmentStatus/add/' + this.state.data.Employee_DeliverSSN;
                data["Parcel_ParcelID"] = this.state.data.Parcel_ParcelID;
                axios.post(url, data).then((res)=>{
                    if ( res.status === 200 ){
                        console.log("success");
                        alert("shipment status added!");
                    }
                    else {
                        console.log("something wrong!");
                        alert("something went wrong! please try again later.");
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            }
        }
        
    }

    render(){

        if ( !this.state.doneLoading ){
            return null;
        }

        var items = [];
        if ( !this.state.addShipmentStatus ){
            for(var key in this.props.responseToKey){
                items.push(<div key={key} className="form-group">
                    <label className="font-weight-bold" htmlFor={key}>{key}</label>
                    <input className="form-control" type="text" id={key} name={key} defaultValue={this.props.responseToKey[key]} disabled></input>
                </div>);
            }
        }
        

        var inputs = [] ;

        inputs.push(<div key="Timestamp-holder" className="form-group">
                        <label className="font-weight-bold" htmlFor="Timestamp">Date Time</label>
                        <input id="Timestamp" name="Timestamp" className="form-control" type="datetime-local" value={this.formatDateTimeLocal(this.state.data.Timestamp)} onChange={this.handleChange}></input>
                    </div>);
        
        if ( this.state.data.ShipmentPoint === null){
            inputs.push(<div key="ShipmentPoint-holder" className="form-group">
                            <label className="font-weight-bold" htmlFor="ShipmentPoint">Shipment Point</label>
                            <input id="ShipmentPoint" name="ShipmentPoint" className="form-control" type="text" value="" onChange={this.handleChange}></input> 
                        </div>);
        }
        else {
            inputs.push(<div key="ShipmentPoint-holder" className="form-group">
                            <label className="font-weight-bold" htmlFor="ShipmentPoint">Shipment Point</label>
                            <input id="ShipmentPoint" name="ShipmentPoint" className="form-control" type="text" value={this.state.data.ShipmentPoint} onChange={this.handleChange}></input> 
                        </div>);
        }
        if ( this.state.data.Status === null ){
            inputs.push(<div key="Status-holder" className="form-group">
                        <label className="font-weight-bold" htmlFor="Status">Status</label>
                        <input id="Status" name="Status" className="form-control" type="text" value="" onChange={this.handleChange}></input> 
                    </div>);
        }
        else {
            inputs.push(<div key="Status-holder" className="form-group">
                            <label className="font-weight-bold" htmlFor="Status">Status</label>
                            <input id="Status" name="Status" className="form-control" type="text" value={this.state.data.Status} onChange={this.handleChange}></input> 
                        </div>);
        }

        return <div className="container mt-5">
            <h1 className="text-center">Edit Shipment Status</h1>
            <form onSubmit={this.handleSubmit}>
                {items}
                {inputs}
            <div className="d-flex flex-row justify-content-between">
                <button className="btn btn-primary" type="submit">save</button>
                <button className="btn btn-secondary" type="button" onClick={this.resetForm}>cancel</button>
            </div>
        </form>
        </div>
        
    }
}

export default EmployeeShipmentStatusEdit;
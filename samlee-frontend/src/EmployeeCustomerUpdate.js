import React from 'react';
import axios from 'axios';

class EmployeeCustomerUpdate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            data: {
                RegisterID: null,
                FirstName: null,
                LastName: null,
                TelephoneNo: null,
                EMail: null,
                HouseNo: null,
                Street: null,
                SubDistrict: null,
                District: null,
                Province: null,
                Country: null,
                PostalCode: null,
                Gender: null,
            },
            error: null,
            customerID: this.props.customerID,
            addCustomer: this.props.addCustomer,
        };
        this.resetData = this.resetData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchDatas() {
        axios.get('http://localhost:8000/customer/edit/'+this.state.customerID)
            .then(res => {
                this.setState({
                    data: res.data[0],
                    doneLoading: true
                });
            })
    }

    componentDidMount(){
        if(this.state.customerID !== null) {
            this.fetchDatas();
        }
    }

    getOnlyDate(dtFromQuery){	
        var d = new Date(dtFromQuery),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    return [year, month, day].join('-');
    }

    resetData(){
        if(this.state.customerID !== null)  this.fetchDatas();
        else{
            var data = {
                RegisterID: null,
                FirstName: null,
                LastName: null,
                TelephoneNo: null,
                EMail: null,
                HouseNo: null,
                Street: null,
                SubDistrict: null,
                District: null,
                Province: null,
                Country: null,
                PostalCode: null,
                Gender: null,
            };
            this.setState({data: data});
        }
        window.location.reload();
    }

    handleChange(event){
        const data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({
            data: data
        });
    }

    handleSubmit(event){

        

        if(this.state.customerID !== null){ //Case Edit
            event.preventDefault();
            const data = this.state.data;

            //chk First and Last name can't be empty
            if(data.FirstName == "" || data.FirstName == null)
            {
                alert("FirstName can't be empty");
            }
            else if(data.LastName == "" || data.LastName == null)
            {
                alert("Last can't be empty");
            }

            else
            {
                const url = "http://localhost:8000/customer/edit/"  + this.state.customerID;
                axios.post(url, data).then((res)=>{
                    if ( res.status === 200 ){
                        console.log("success");
                        alert("customer data updated!");
                    }
                }).catch((err)=>{
                    console.log(err);
                });
                window.location.reload();
            }
        }
        else { //Case Add
            event.preventDefault();
            const data = this.state.data;
            const url = "http://localhost:8000/customer/add";

            console.log(data);
            //chk First and Last name can't be empty
            if(data.FirstName == "" || data.FirstName == null)
            {
                alert("FirstName can't be empty");
            }
            else if(data.LastName == "" || data.LastName == null)
            {
                alert("Last can't be empty");
            }

            else
            {
                axios.post(url, data).then((res)=>{
                    if ( res.status === 200 ){
                        console.log("success");
                        alert("customer data added!");
                    }
                }).catch((err)=>{
                    console.log(err);
                });
                //window.location.reload();
            }
        }
    }

    render(){
        if ( !this.state.doneLoading && !this.state.addCustomer){
            return null;
        }

        const items = [];
        for(var key in this.state.data){
            var value = this.state.data[key];

            let input;
            if ( key === "RegisterID" ){
                if(value === null)  continue;
                if(value !== null){
                    input = <input name={key} className="form-control" type="text" id={key} value={value} onChange={this.handleChange} disabled></input>
                } 
            }
            else if ( key === "Gender" ){
                if ( value === "M"){
                    input = <div id={key}>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={key} id="male" value="M" onChange={this.handleChange} checked></input>
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={key} id="female" value="F" onChange={this.handleChange}></input>
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                }
                else {
                    input = <div id={key}>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={key} id="male" value="M" onChange={this.handleChange}></input>
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={key} id="female" value="F" onChange={this.handleChange} checked></input>
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                }
            }
            else {
                if(value !== null) input = <input name={key} className="form-control" type="text" id={key} value={value} onChange={this.handleChange}></input>
                else input = <input name={key} className="form-control" type="text" id={key} onChange={this.handleChange}></input>
            }

            items.push(
                <div className="form-group" key={key}>
                    <label className="font-weight-bold" htmlFor={key}>{key}</label>
                    {input}
                </div>
            );
        }

        let submitBtnText = this.state.addCustomer ? "add" : "save";
        let cancelBtnText = this.state.addCustomer ? "clear" : "cancel";
        var btnGroup = <div className="d-flex flex-row justify-content-between">
                            <button className="btn btn-primary" type="submit">{submitBtnText}</button>
                            <button type="button" className="btn btn-secondary" onClick={()=>this.resetData()}>{cancelBtnText}</button>
                        </div>;

        return <div className="container mt-5">
            <h1 className="text-center">Edit Customer</h1>
            <form onSubmit={this.handleSubmit}>
            {items}
            {btnGroup}
            </form>
        </div>;
    }
}

export default EmployeeCustomerUpdate;
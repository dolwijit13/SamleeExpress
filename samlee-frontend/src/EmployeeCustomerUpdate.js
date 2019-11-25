import React from 'react';
import axios from 'axios';
import EmployeeCustomer from './EmployeeCustomer';
import Login from './login2';
import {Redirect} from 'react-router-dom';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

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
            goToEmpCus: false,
            employeeSSN: this.props.ssn,
        };
        this.resetData = this.resetData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.backHandler = this.backHandler.bind(this);
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
        if(!this.state.addCustomer) {
            this.fetchDatas();
        }
        this.setState({goToEmpCus:false});
    }

    resetData(event){
        if(!this.state.addCustomer)  this.fetchDatas();
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
        event.preventDefault();
        const data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({
            data: data
        });
    }

    handleSubmit(event){
        if(!this.state.addCustomer){ //Case Edit
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
                        window.location = "/customerList/";
                    }
                }).catch((err)=>{
                    console.log(err);
                });
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
                        window.location = "/customerList/";
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            }
        }
    }

    backHandler(){

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
        var backBtn = <Link to="/customerList/"><button className="btn btn-dark">Back</button></Link>;
        var topMenu = 
            <div className="container d-flex flex-row justify-content-between mt-3">
                {backBtn}
            </div>
        return (
            <Router>
                <Switch>
                    <Route exact path="/customerManage/">
            <div className="mb-5">
            <ul>
            <li className="left"><a>SamleeExpress</a></li>
            <Link to="/"><li className="right"><a>Log out</a></li></Link>
            </ul>
            {topMenu}
            <div className="container mt-5">
            <h1 className="text-center">Edit Customer</h1>
            <form onSubmit={this.handleSubmit}>
            {items}
            {btnGroup}
            </form>
            </div>
            </div>
                    </Route>
                    <Route exact path="/customerList/" component={()=><EmployeeCustomer ssn={this.state.employeeSSN} addCustomer={false} />} />
                    <Route exact path="/" component={()=><Login/>} />
                </Switch>
            </Router>
        );
    }
}
export default EmployeeCustomerUpdate;
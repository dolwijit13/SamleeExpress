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
                PostalCode: "",
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
                PostalCode: "",
                Gender: null,
            };
            this.setState({data: data});
        }
        window.location.reload();
    }

    handleChange(event){
        event.preventDefault();

        let nam = event.target.name;
        let val = event.target.value;
        if(this.isHaveSpecialChar(val)) return;
        if("TelephoneNo" == nam.trim())
        {
            if(val.length >10) return;
            if(this.isHaveChar(val))return;
        }
        if("PostalCode" == nam.trim())
        {
            if(val.length >5) return;
            if(this.isHaveChar(val)) return;
        }
        console.log("test");
        const data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({
            data: data
        });
    }

    isHaveChar(s)
    {
        var format = /[a-zA-Z]+/;

        if(format.test(s)){
        return true;
        } else {
        return false;
        }
    }

    isHaveSpecialChar(s)
    {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]+/;

        if(format.test(s)){
        return true;
        } else {
        return false;
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const data = this.state.data;
        console.log(data);

        //chk First and Last name can't be empty
        if(data.FirstName == "" || data.FirstName == null)
        {
            alert("First name can't be empty");
        }
        else if(data.LastName == "" || data.LastName == null)
        {
            alert("Last name can't be empty");
        }
        else if(data.PostalCode == "" || data.PostalCode == null)
        {
            alert("Postal Code can't be empty");
        }
        else if(data.PostalCode < "10000" || data.PostalCode.length<5)
        {
            alert("Wrong Postal Code (must be 10000-99999)");
        }
        else if(!this.state.addCustomer){ //Case Edit
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
            window.location.reload();
        }
        else { //Case Add
            const data = this.state.data;
            const url = "http://localhost:8000/customer/add";

            
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
                else input = <input name={key} className="form-control" type="text" id={key} value={""} onChange={this.handleChange}></input>
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
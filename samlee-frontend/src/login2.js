import React from 'react';
import './App.css';
import EmployeeCustomer from './EmployeeCustomer';
import {Redirect} from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './Employee.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      ParcelID: '',
      redirect: false,
      employee: null,
      customer: null,
      logInAsEmployee: false,
      logInAsCustomer: false,
      responseTos:null,
      doneLoading:false,
      trackingTable:null
	  };
      
  }

  loginHandler = (event) => {
    event.preventDefault();
    let username = this.state.username;
    let passwd = this.state.password;
    if (passwd.trim() == "") {
      alert("Please enter password.");
    }
    else if(username.length == 13) //case log in as employee
    {
      //Not implement yet
      this.setState({logInAsEmployee: true});
    }
    else if(username.length == 10) //case log in as customer
    {
      //fetchCustomer(username);
      fetch('http://localhost:8000/customer/search/'+username)
      .then(response => response.json())
      .then(
        data =>{ this.setState({
          customer: data[0],
          logInAsCustomer: true,
          })
        }
      )
      .then(() => {

      if(this.state.customer === undefined)
      {
        alert("Wrong username or password");
      }
      else if(this.state.customer.RegisterID === username)
      {
        alert("Log in as : "+this.state.customer.FirstName);
	this.setState({ logInAsCustomer: true })
      }
      
    })
    } 
    else
    {
      alert("Wrong username or password");
    }
  }

  fetchDatas() {
    fetch('http://localhost:8000/shipmentStatus/' + this.state.ParcelID)
      .then(response => response.json())
      .then(data =>{
        this.setState({
          responseTos: data,
          doneLoading: true,
      })}
      )
      .then(()=> {
        var trackingTable = this.state.responseTos.map((responseTo,index)=>
        
        <tr key={index} className="parcel-table-data">
            <td width="15%">{responseTo.FirstName}</td>
            <td width="15%">{responseTo.LastName}</td>
            <td width="30%">{(new Date(responseTo.Timestamp)).toString()}</td>
            <td width="10%">{responseTo.ShipmentPoint}</td>
            <td width="30%">{responseTo.Status}</td>
    </tr> )
        return trackingTable;
      })
      .then((trackingTable)=> this.setState({trackingTable: trackingTable}))
      .catch(error => this.setState({ error, doneLoading: false }));
  }

  trackingHandler = (event) => {
    event.preventDefault();
    let ParcelID = this.state.ParcelID;
    if (ParcelID.trim() == "")
    {
      alert("Please enter Parcel ID");
    }
    else
    {
      this.fetchDatas();
    }
  }

  paramField = (event) => {
    let uname = event.target.name;
    let passwd = event.target.value;
    this.setState({[uname]: passwd});
  }
	
  render() {
    var employeeScreen = null;

    if(this.state.logInAsEmployee)  employeeScreen= <Redirect to="/customerList/"/>;
    return (
      <Router>
        <Switch>
          <Route exact path="/">
          <form>
          <div>
            <ul>
              <li className="left"><a>SamleeExpress</a></li>
              <li><button className="btn btn-primary signInButton" type="submit" onClick={this.loginHandler}>Sign in</button></li>
              <li><input className="loginUserName" type="password" placeholder="Password" name='password' onChange={this.paramField}/></li>
              <li><input id="email" className="loginUserName" type="text" placeholder="Username" name='username' onChange={this.paramField}/></li>
            </ul>
	          <div className="center">
              <h1>Tracking Parcel</h1>
            </div>
            <div className="center form-group form-inline">
              <input id="ParcelID" className="trackID" type="text" placeholder="Enter your Parcel ID" name='ParcelID' onChange={this.paramField}/>
              <button className="btn btn-primary trackButton" type="track" onClick={this.trackingHandler}>Track</button>
            </div>

            <table className="parcel-table">
            <thead>
                <tr className="parcel-table-head">
                    <th width="15%">Deliver FirstName</th>
                    <th width="15%">Deliver LastName</th>
                    <th width="30%">Date Time</th>
                    <th width="10%">Shipment Point</th>
                    <th width="30%">Shipment Status</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {this.state.trackingTable}
            </tbody>
            </table>
          </div>
        </form>
        {employeeScreen}
        </Route>
        <Route path="/customerList/" component={()=><EmployeeCustomer ssn={this.state.username}/>} />
        </Switch>
      </Router>
    );
  }
}

export default App;
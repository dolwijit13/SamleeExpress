import React from 'react';
import './App.css';
import Customer from './Customer.js';
import EmployeeCustomer from './EmployeeCustomer';
import {Redirect} from 'react-router-dom';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
      employee: null,
      customer: null,
      logInAsEmployee: false,
      logInAsCustomer: false
	  };
      
  }

  loginHandler = (event) => {
    event.preventDefault();
    alert('click');
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
          <form onSubmit={this.loginHandler}>
          <div>
            <ul>
              <li className="left"><a>SamleeExpress</a></li>
            </ul>
	          <div className="center">
              <h1>Welcome to SamleeExpress</h1>
            </div>
            <div className="center form-group form-inline">
              <input id="email" className="form-control" type="text" placeholder="Username" name='username' onChange={this.paramField}/>
            </div>
	          <div className="center form-group form-inline">
	            <input className="form-control" type="password" placeholder="Password" name='password' onChange={this.paramField}/>
            </div>
	          <div className="center">
              <button className="btn btn-primary" type="submit">Sign in</button>
            </div>
            <div className="center">
              <h4>Hello {this.state.username}</h4>
            </div>
          </div>
        </form>
        {employeeScreen}
        </Route>
          <Route path="/customerList/" component={()=><EmployeeCustomer ssn={this.state.username} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
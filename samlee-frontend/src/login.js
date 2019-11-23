import React from 'react';
import './App.css';
import Customer from './Customer.js';
import Employee from './Employee.js';

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


  fetchCustomer(username) { //case log in as customer
    fetch('http://localhost:8000/customer/search/'+username)
      .then(response => response.json())
      .then(data =>{
        this.setState({
          customer: data[0],
          logInAsCustomer: true,
      })}
      )
      .catch(error => this.setState({ error, logInAsCustomer: false }));
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
      fetch('http://localhost:8000/employee/search/'+username)
      .then(response => response.json())
      .then(
        data =>{ this.setState({
          employee: data[0],
          logInAsEmployee: true,
          })
        }
      )
      .then(() => {

      if(this.state.employee === undefined)
      {
        alert("Wrong username or password");
      }
      else if(this.state.employee.SSN === username)
      {
        alert("Log in as : "+this.state.employee.FirstName);
	this.setState({ logInAsEmployee: true })
      }
      
    })

      //Not implement yet
	    
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
	var stage;
	stage = (
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
	<     div className="center">
          <button className="btn btn-primary" type="submit">Sign in</button>
        </div>
        <div className="center">
          <h4>Hello {this.state.username}</h4>
        </div>
      </div>
      </form>
	);
	if(this.state.logInAsCustomer){
	stage=<Customer />
	}
	if(this.state.logInAsEmployee){
	stage=<Employee />
	}
    return (
	<div>
	{stage}
	</div>
    );
  }
}

export default App;
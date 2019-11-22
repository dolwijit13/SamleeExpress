import React from 'react';
import './App.css';
import Customer from './Customer.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
	    redirect: false,
	  };
  }
  loginHandler = (event) => {
    event.preventDefault();
    let passwd = this.state.password;
    if (passwd.trim() == "") {
      alert("Please enter password.");
    }
  }
  paramField = (event) => {
    let uname = event.target.name;
    let passwd = event.target.value;
    this.setState({[uname]: passwd});
  }
  render() {
    return (
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
          <button className="btn btn-primary" type="submit" onClick = { <Customer /> }>Sign in</button>
        </div>
        <div className="center">
          <h4>Hello {this.state.username}</h4>
        </div>
      </div>
      </form>
    );
  }
}

export default App;
import React from 'react';
import './App.css';
import Customer from './Customer.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.State = {
	redirect: false
	};
  }
  render() {
    return (
      <div>
        <ul>
          <li className="left"><a>SamleeExpress</a></li>
        </ul>
	<div className="center">
          <a>Welcome to SamleeExpress</a>
        </div>
        <div className="center">
          <input type="text" placeholder="Username" />
        </div>
	<div className="center">
	  <input type="text" placeholder="Password" />
        </div>
	<div className="center">
          <button type="submit"
	  onClick = { <Customer /> }>Sign in</button>
        </div>
      </div>
    );
}
}
export default App;
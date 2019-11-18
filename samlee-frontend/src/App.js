import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
  }

  callAPI(){
    alert("start");
    fetch("http://localhost:3001").then(res=>res.text).then(res=>this.setState({apiResponse: res})).catch(err => err);
    alert("fin");
  }

  componentWillMount(){
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p>this is react</p>
        <p>{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;

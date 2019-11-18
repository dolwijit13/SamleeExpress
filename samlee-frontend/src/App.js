import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://localhost:3001/customer",
      apiResponse: null};
    this.callAPI = this.callAPI.bind(this);
  }

  callAPI(){
    alert("start");
    axios.get(this.state.url).then((res)=>{this.setState({apiResponse: res.data})}).catch((error=>{console.log(error)}));
  }

  componentDidMount(){
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

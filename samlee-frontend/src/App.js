import React from 'react';
import './App.css';
import Login from './login.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    
  }
  render() {
    return (
      <Login />
    );
  }
}
export default App;
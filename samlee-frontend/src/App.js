import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    
  }

  render() {
    return (
      <div>
        <ul>
          <li className="left"><a>SamleeExpress</a></li>
          <li className="right"><a>Log out</a></li>
          <li className="right"><a>History</a></li>
        </ul>
        <div className="search">
          <input type="text" placeholder="Search.." />
          <button type="submit">search</button>
        </div>
      </div>
    );
  }
}
export default App;
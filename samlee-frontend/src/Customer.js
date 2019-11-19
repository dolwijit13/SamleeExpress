import React from 'react';
import './App.css';

class Customer extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    
  }
/*{!this.state.isLoading ? (
          this.state.users.map(user => {
            const { RegisterID, FirstName, LastName } = user;
            return (
              <div key={RegisterID} className="parcel">
                <p>FirstName: {FirstName}</p>
                <p>LastName: {LastName}</p>
                <hr />
              </div>
            );
          })
        ) : null}*/
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
          <button type="submit" onClick={this.fetchUsers}>search</button>
        </div>
      </div>
    );
  }
}
export default Customer;
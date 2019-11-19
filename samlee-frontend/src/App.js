import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      users: null,
      error: null
    };
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  fetchUsers() {
    fetch('http://localhost:8000/customer')
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        this.setState({
          users: data,
          isLoading: false,
      })}
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount(){
    this.fetchUsers();
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
          <button type="submit" onClick={this.fetchUsers}>search</button>
          {!this.state.isLoading ? (
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
        ) : null}
        </div>
      </div>
    );
  }
}
export default App;
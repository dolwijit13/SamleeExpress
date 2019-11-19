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
<<<<<<< HEAD
    fetch('http://localhost:8000/customer')
||||||| merged common ancestors
    fetch(`http://localhost:3000/customer`)
=======
    fetch(`http://localhost:8000/customer`)
>>>>>>> b5733e19b35222545c91d71428bc68b5c7d8e8c5
      .then(response => response.json())
<<<<<<< HEAD
      .then(data =>{
        console.log(data);
        this.setState({
          users: data,
          isLoading: false,
      })}
||||||| merged common ancestors
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
=======
      .then(data =>
        {
          this.setState({
            users: data,
            isLoading: false,
          })
        }
>>>>>>> b5733e19b35222545c91d71428bc68b5c7d8e8c5
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
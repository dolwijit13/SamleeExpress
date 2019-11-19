import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*
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
*/

class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  fetchUsers() {
    fetch(`http://localhost:3000/customer`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>

        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <h1>Customer</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          users.map(user => {
            const { RegisterID, FirstName, LastName } = user;
            return (
              <div key={RegisterID}>
                <p>FirstName: {FirstName}</p>
                <p>LastName: {LastName}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}
      </React.Fragment>
    );
  }
}


export default App;
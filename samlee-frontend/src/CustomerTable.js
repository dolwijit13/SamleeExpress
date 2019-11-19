import React from 'react';

class CustomerTable extends React.Component{
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

    render(){
        return(
            <table>
                
            </table>
        );
    }
}
export default CustomerTable;
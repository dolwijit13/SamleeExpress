import React from 'react';

class CustomerTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            datas: null,
            error: null
        };
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    fetchDatas() {
        fetch('http://localhost:8000/shipmentStatus/:employeeid')
          .then(response => response.json())
          .then(data =>{
            console.log(data);
            this.setState({
              datas: data,
              doneLoading: true,
          })}
          )
          .catch(error => this.setState({ error, doneLoading: false }));
      }
    
      componentDidMount(){
        this.fetchDatas();
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
    render(){
        if(!this.state.doneLoading) return null;

        return(
            <table>
                <thead>
                    <tr>
                        <td>Parcel</td>
                        <td>Status</td>
                        <td>Location</td>
                        <td>Responsed by</td>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        );
    }
}
export default CustomerTable;
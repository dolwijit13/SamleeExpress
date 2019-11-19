import React from 'react';

class EmployeeParcel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        doneLoading: false,
        customers: null,
        error: null,
        gotoParcelPage: false,
        gotoEditPage: false,
    };
  }

  fetchDatas() {
    fetch('http://localhost:8000/customer')
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        this.setState({
          customers: data,
          doneLoading: true,
      })}
      )
      .catch(error => this.setState({ error, doneLoading: false }));
  }

  componentDidMount(){
    this.fetchDatas();
}

  render() {
    if(!this.state.doneLoading) return null;
    return (
        <div>

        </div>
    );
  }
}
export default EmployeeParcel;
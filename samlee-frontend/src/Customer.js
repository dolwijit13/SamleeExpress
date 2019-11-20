import React from 'react';
import CustomerParcel from './CustomerParcel';
import './Customer.css';

class Customer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onParcelList: true,
      onParcelPage: false,
      parcelID: null
    };
    this.changeToParcelPage = this.changeToParcelPage.bind(this);
  }
  changeToParcelPage(parcelID){
    this.setState({onParcelList:false, onParcelPage:true, parcelID: parcelID});
  }

  render() {
    var search = (this.state.onParcelList?null:
      <div className="search">
        <input type="text" placeholder="Search.." />
        <button type="submit">search</button>
      </div>);
    var stage;
    if(this.state.onParcelList) stage = <CustomerParcel senderID={this.state.parcelID} changeToParcelPage={this.changeToParcelPage}/>;
    return (
      <div>
        <ul>
          <li className="left"><a>SamleeExpress</a></li>
          <li className="right"><a>Log out</a></li>
        </ul>
        {search}
        {stage}
      </div>
      
    );
  }
}
export default Customer;
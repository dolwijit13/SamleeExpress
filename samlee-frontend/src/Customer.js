import React from 'react';
import CustomerParcel from './CustomerParcel';
import './Customer.css';
import ParcelPage from './ParcelPage';

class Customer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onParcelList: true,
      onParcelPage: false,
      parcelID: null
    };
    this.changeToParcelPage = this.changeToParcelPage.bind(this);
    this.changeToParcelList = this.changeToParcelList.bind(this);
  }
  changeToParcelPage(parcelID){
    this.setState({onParcelList:false, onParcelPage:true, parcelID: parcelID});
  }
  changeToParcelList(){
    this.setState({onParcelList:true, onParcelPage:false, parcelID:null});
  }

  render() {
    var search = (this.state.onParcelPage?null:
      <div className="search">
        <input type="text" placeholder="Search.." />
        <button type="submit">search</button>
      </div>);
    var stage;
    if(this.state.onParcelList) stage = <CustomerParcel senderID={this.state.parcelID} changeToParcelPage={this.changeToParcelPage}/>;
    else if(this.state.onParcelPage) stage = <ParcelPage  changeToParcelList={this.changeToParcelList}/>;
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
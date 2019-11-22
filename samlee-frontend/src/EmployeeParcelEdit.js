import React from 'react';

class EmployeeParcelEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doneLoading: false,
            data: {
                ParcelID: null,
                Type: null,
                InsuranceType: null,
                HouseNo: null,
                Street: null,
                SubDistrict: null,
                District: null,
                Province: null,
                Country: null,
                PostalCode: null,
                ShipmentType: null,
            },
            error: null,
            senderID: this.props.senderID,
            addParcel: this.props.addParcel,
        }
    }

    fetchDatas() {
        axios.get('http://localhost:8000/parcel/edit/'+this.state.customerID)
            .then(res => {
                this.setState({
                    data: res.data[0],
                    doneLoading: true
                });
            })
    }

    componentDidMount(){
        if(this.state.customerID !== null) {
            this.fetchDatas();
        }
    }
    
    render(){
        
        return(
            <div className="container mt-5">
                <h1 className="text-center">Edit Customer</h1>
                <form onSubmit={this.handleSubmit}>
                    {items}
                    <div className="d-flex flex-row justify-content-between">
                        <button className="btn btn-primary" type="submit">save</button>
                        <button type="button" className="btn btn-secondary" onClick={()=>this.resetData()}>cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default EmployeeParcelEdit;
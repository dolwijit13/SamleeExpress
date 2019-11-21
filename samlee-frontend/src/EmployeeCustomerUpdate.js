import React from 'react';
import axios from 'axios';

class EmployeeCustomerUpdate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            data: null,
            error: null,
            gotoParcelPage: false,
            gotoEditPage: false,
            customerID: this.props.customerID
        };
        this.resetData = this.resetData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchDatas() {
        axios.get('http://localhost:8000/customer/edit/'+this.state.customerID)
            .then(res => {
                this.setState({
                    data: res.data[0],
                    doneLoading: true
                });
            })
    }

    componentDidMount(){
        this.fetchDatas();
    }

    getOnlyDate(dtFromQuery){	
        const index = dtFromQuery.indexOf("T");
        if ( index > 0 ){
            return dtFromQuery.slice(0,index);
        }
        return dtFromQuery;
    }

    resetData(){
        this.fetchDatas();
    }

    handleChange(event){
        const data = this.state.data;
        data[event.target.name] = event.target.value;
        this.setState({
            data: data
        });
    }

    handleSubmit(event){
        event.preventDefault();
        const data = this.state.data;
        const url = "http://localhost:8000/customer/edit/"  + this.state.customerID;
        axios.post(url, data).then((res)=>{
            if ( res.status === 200 ){
                console.log("success");
                alert("customer data updated!");
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    render(){
        if ( !this.state.doneLoading ){
            return null;
        }

        const items = [];
        for(var key in this.state.data){
            var value = this.state.data[key];

            let input;
            if ( key === "RegisterID" ){
                input = <input name={key} className="form-control" type="text" id={key} value={value} onChange={this.handleChange} disabled></input>
            }
            else if ( key === "StartingDate" ){
                const date = this.getOnlyDate(this.state.data["StartingDate"]);
                input = <input name={key} className="form-control" type="date" id={key} value={date} onChange={this.handleChange}></input>
            }
            else if ( key === "Gender" ){
                if ( value === "M"){
                    input = <div id={key}>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={key} id="male" value="M" onChange={this.handleChange} checked></input>
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={key} id="female" value="F" onChange={this.handleChange}></input>
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                }
                else {
                    input = <div id={key}>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={key} id="male" value="M" onChange={this.handleChange}></input>
                            <label htmlFor="male">Male</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={key} id="female" value="F" onChange={this.handleChange} checked></input>
                            <label htmlFor="female">Female</label>
                        </div>
                    </div>
                }
            }
            else {
                input = <input name={key} className="form-control" type="text" id={key} value={value} onChange={this.handleChange}></input>
            }

            items.push(
                <div className="form-group" key={key}>
                    <label className="font-weight-bold" htmlFor={key}>{key}</label>
                    {input}
                </div>
            );
        }

        return <div className="container">
            <form onSubmit={this.handleSubmit}>
            {items}
            <div className="d-flex flex-row justify-content-between">
                <button className="btn btn-primary" type="submit">save</button>
                <button type="button" className="btn btn-secondary" onClick={()=>this.resetData()}>cancel</button>
            </div>
            </form>
        </div>;
    }
}

export default EmployeeCustomerUpdate;
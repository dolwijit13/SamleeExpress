import React from 'react';
import axios from 'axios';

class EmployeeEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            doneLoading: false,
            SSN: this.props.SSN
        };
        this.resetData = this.resetData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    fetchDatas() {
        axios.get('http://localhost:8000/employee/edit/'+this.state.SSN)
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
        const url = "http://localhost:8000/employee/edit/"  + this.state.SSN;
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
            if ( key === "SSN" ){
                input = <input name={key} className="form-control" type="text" id={key} value={value} onChange={this.handleChange} disabled></input>
            }
            else if ( ["StartingDate", "DateOfBirth", "StartingDate"].indexOf(key) > -1 ){
                const date = this.getOnlyDate(this.state.data[key]);
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
            else if ( key === "Position" ){
                input = <select className="form-control" name={key} id={key} value={value} onChange={this.handleChange}>
                    <option value="Administrator">Administrator</option>
                    <option value="Deliveryman">Deliveryman</option>
                    <option value="Stockmanage">Stockmanage</option>
                </select>
            }
            else if (["FK_Locate_Branch_BranchID","FK_PartOf_Department_DepartmentCode","FK_Supervise_Employee_SSN"].indexOf(key) > -1 ){
                continue;
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
            <h1 className="text-center mt-5">Edit Your Infomation</h1>
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

export default EmployeeEdit;
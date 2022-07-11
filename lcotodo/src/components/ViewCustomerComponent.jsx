import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';
import { useParams } from "react-router-dom";

export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
}

class ViewCustomerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            customer: {}
        }
    }

    componentDidMount() {
        CustomerService.getCustomerById(this.state.id).then(res => {
            this.setState({customer: res.data});
        });
    }

    render() {
        return (
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Customer Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Customer First Name:</label>
                            <div>{this.state.customer.firstName}</div>
                        </div>
                        <div className="row">
                            <label>Customer Last Name:</label>
                            <div>{this.state.customer.lastName}</div>
                        </div>
                        <div className="row">
                            <label>Customer Email Address:</label>
                            <div>{this.state.customer.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ViewCustomerComponent);
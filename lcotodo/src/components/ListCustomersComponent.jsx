import React, {Component} from 'react';
import CustomerService from '../services/CustomerService';
import { useNavigate } from "react-router-dom";
import configData from "../config.json";

export function withRouter(Children){
    return(props)=>{

       const match  = {navigate: useNavigate()};
       return <Children {...props}  match = {match}/>
   }
}
class ListCustomersComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }

        this.addCustomer = this.addCustomer.bind(this);
        this.editCustomer = this.editCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
        this.viewCustomer = this.viewCustomer.bind(this);
    }

    componentDidMount() {
        CustomerService.getCustomers().then(res => {
            this.setState({customers: res.data});
        });
    }
    
    addCustomer() {
        const path = configData.ADD_CUSTOMER;
        this.props.match.navigate(`/${path}/-1`);
    }

    editCustomer(id) {
        const path = configData.ADD_CUSTOMER;
        this.props.match.navigate(`/${path}/${id}`);
    }

    deleteCustomer(id) {
        CustomerService.deleteCustomer(id).then(res => {
            this.setState({customers: this.state.customers.filter(employee => employee.id !== id)});
        });
    }
    
    viewCustomer(id) {
        const path = configData.VIEW_CUSTOMER;
        this.props.match.navigate(`/${path}/${id}`);
    }
    
    render() {
        return (
            <div>
                <h2 className = "text-center">Customers List</h2>
                <div>
                    <button className="btn btn-primary" onClick={this.addCustomer}>Add Customer</button>
                </div>
                <div className="row">
                    <table className = "table table-striped table-boardered">
                        <thead>
                            <tr>
                                <th>Customer First Name</th>
                                <th>Customer Last Name</th>
                                <th>Customer Email Id</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.customers.map(
                                    customer => 
                                    <tr key={customer.id}>
                                        <td>{customer.firstName}</td>
                                        <td>{customer.lastName}</td>
                                        <td>{customer.email}</td>
                                        <td>
                                            <button onClick={() => this.editCustomer(customer.id)} className="btn btn-info">Update</button>
                                            <button style={{marginLeft: "10px"}} onClick={() => this.deleteCustomer(customer.id)} className="btn btn-danger">Delete</button>
                                            <button style={{marginLeft: "10px"}} onClick={() => this.viewCustomer(customer.id)} className="btn btn-info">View</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(ListCustomersComponent);

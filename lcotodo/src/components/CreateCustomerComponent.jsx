import React, { Component } from 'react';
import CustomerService from '../services/CustomerService';
import { useParams, useNavigate } from "react-router-dom";
import configData from "../config.json";
import { properties } from '../properties.js';

const emailRegExp = RegExp(properties.EMAIL_REGEX);

export function withRouter(Children) {
    return (props) => {

        const match = { params: useParams(), navigate: useNavigate() };
        return <Children {...props} match={match} />
    }
}

class CreateCustomerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: '',
            isError: {
                firstName: '',
                lastName: '',
                email: ''
            }
        }
    }

    componentDidMount() {
        if (this.state.id == -1) {
            return;
        } else {
            CustomerService.getCustomerById(this.state.id).then(res => {
                let customer = res.data;
                this.setState({
                    firstName: customer.firstName,
                    lastName: customer.lastName, email: customer.email
                });
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        let customer = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email };
        if (this.isValidForm(customer)) {
            if (this.state.id == -1) {
                CustomerService.createCustomer(customer).then(res => {
                    this.props.match.navigate(`/${configData.CUSTOMERS}`);
                });
            } else {
                CustomerService.updateCustomer(this.state.id, customer).then(res => {
                    this.props.match.navigate(`/${configData.CUSTOMERS}`);
                });
            }
        }
    };

    isValidForm = (customer) => {
        let isError = { ...this.state.isError };
        isError.firstName = customer.firstName.length === 0 ? "First name is required" : "";
        isError.lastName = customer.lastName.length === 0 ? "Last name is required" : "";
        isError.email = emailRegExp.test(customer.email) ? "" : "Email address is invalid";
        this.setState({
            isError
        });

        return !(isError.firstName.length > 0 || isError.lastName.length > 0 || isError.email.length > 0);
    }

    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    cancel = () => {
        this.props.match.navigate(`/${configData.CUSTOMERS}`);
    }

    getTitle = () => {
        if (this.state.id == -1) {
            return <h3 className="text-center">Add Customer</h3>;
        } else {
            return <h3 className="text-center">Update Customer</h3>;
        }
    }

    render() {
        const { isError, firstName, lastName, email } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {this.getTitle()}
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit} noValidate>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className={isError.firstName.length > 0 ? "is-invalid form-control" : "form-control"}
                                        name="firstName"
                                        onChange={this.formValChange}
                                    />
                                    {isError.firstName.length > 0 && (
                                        <span className="invalid-feedback">{isError.firstName}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className={isError.lastName.length > 0 ? "is-invalid form-control" : "form-control"}
                                        name="lastName"
                                        onChange={this.formValChange}
                                    />
                                    {isError.lastName.length > 0 && (
                                        <span className="invalid-feedback">{isError.lastName}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"}
                                        name="email"
                                        onChange={this.formValChange}
                                    />
                                    {isError.email.length > 0 && (
                                        <span className="invalid-feedback">{isError.email}</span>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-block btn-success" style={{ marginTop: "10px" }} disabled={!firstName || !lastName || !email}>Save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginTop: "10px", marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateCustomerComponent);
import React, { Component } from 'react';
import { useNavigate, Link } from "react-router-dom";
import configData from "../config.json";

export function withRouter(Children) {
    return (props) => {
        const match = { navigate: useNavigate() };
        return <Children {...props} match={match} />
    }
}
class NavigationComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    }

    handleLogout = () => {
        localStorage.clear();
        this.props.match.navigate(`/`);
        this.setState({ username: '' });
    }

    componentDidMount() {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            console.log(foundUser.username + " " + foundUser.email);
            this.setState({ username: foundUser.username });
        }
    }
    navigationBar = () => {
        const displayVal = this.state.username ? "inline" : "none";
        const addCustomerPath = configData.ADD_CUSTOMER + "/-1";
        return (
            <div className="tabs">
                <Link className="tab" to={configData.CUSTOMERS}>Customers</Link>
                <Link className="tab" to={addCustomerPath}>Create Customer</Link>
                <label className="navbar-brand">{this.state.username}</label>
                <button type="button" onClick={this.handleLogout} style={{display: displayVal}}>
                    Sign Out
                </button>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.navigationBar()}
            </div>
        );
    }
}

export default withRouter(NavigationComponent);
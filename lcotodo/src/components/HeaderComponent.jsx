import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: '',
                emailId: ''
            }
        }
    }

    handleLogout = () => {
        this.setState({user: {username: '', emailId: ''}});
        localStorage.clear();
    };
    
componentDidMount() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        console.log(JSON.stringify(loggedInUser));
        // const foundUser = JSON.parse(loggedInUser);
        // this.setState({user: foundUser});
    }
}

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="col-md-6">
                            <a href="#" className="navbar-brand">Customer Management App</a>
                            <button onClick={this.handleLogout} disabled={!this.setState.user}>logout</button>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
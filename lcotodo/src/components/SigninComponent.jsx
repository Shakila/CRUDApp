import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { properties } from '../properties.js';
import { useNavigate } from "react-router-dom";
import configData from "../config.json";
import SignupAndSigninService from '../services/SignupAndSigninService.js';

const userRegExp = RegExp(properties.USER_REGEX);
const passwordRegExp = RegExp(properties.PASSWORD_REGEX);

export function withRouter(Children) {
    return (props) => {
        const match = { navigate: useNavigate() };
        return <Children {...props} match={match} />
    }
}

class SigninComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            focuses: {
                usernameFocus: false,
                passwordFocus: false
            },
            errMsg: '',
            success: false
        }
    }

    // componentDidMount() {
    //     const loggedInUser = localStorage.getItem("user");
    // if (loggedInUser) {
    //     this.props.match.navigate(`/${configData.CUSTOMERS}`);
    // }
    // }

    handleSubmit = async (e) => {
        e.preventDefault();
        let credentials = { username: this.state.username, password: this.state.password };
        SignupAndSigninService.signIn(credentials).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));

            this.setState({ success: true });
            //clear state and controlled inputs
            this.setState({ username: "" });
            this.setState({ password: "" });

            this.props.match.navigate(`/${configData.CUSTOMERS}`);
        });
    };

    getTitle = () => {
        return <h3 className="text-center">Sign in</h3>;
    }

    getErrorIcon = () => {
        return <FontAwesomeIcon icon={faInfoCircle} color="red" />
    }

    signUp = () => {
        this.props.match.navigate(`/${configData.SIGNUP}`);
    }

    render() {
        const { errMsg, username, password, focuses } = this.state;
        const { usernameFocus, passwordFocus } = focuses;
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <section>
                                {this.getTitle()}
                                <p
                                    id="uidnote"
                                    className={
                                        errMsg
                                            ? "instructions"
                                            : "offscreen"
                                    }
                                >
                                    {errMsg ? this.getErrorIcon() : ''}
                                    {errMsg}
                                </p>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="username">
                                            Username:
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            autoComplete="off"
                                            onChange={(e) => this.setState({ username: e.target.value })}
                                            value={username}
                                            required
                                            aria-describedby="uidnote"
                                            onFocus={() => { this.state.focuses.usernameFocus = true; }}
                                            onBlur={() => { this.state.focuses.usernameFocus = false; }}
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            onChange={(e) => this.setState({ password: e.target.value })}
                                            value={password}
                                            required
                                            aria-describedby="pwdnote"
                                            onFocus={() => { this.state.focuses.passwordFocus = true; }}
                                            onBlur={() => { this.state.focuses.passwordFocus = false; }}
                                        />
                                    </div>
                                    <button>
                                        Sign In
                                    </button>
                                </form>
                            </section>
                        </div>
                        <div>
                            <p>
                                Don't have an account?
                                <button onClick={this.signUp}>Sign up instead</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SigninComponent);
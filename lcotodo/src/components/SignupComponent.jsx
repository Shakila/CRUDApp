import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { properties } from '../properties.js';
import SignupAndLoginService from '../services/SignupAndLoginService.js';
import configData from "../config.json";
import { useNavigate } from "react-router-dom";

const userRegExp = RegExp(properties.USER_REGEX);
const emailRegExp = RegExp(properties.EMAIL_REGEX);
const passwordRegExp = RegExp(properties.PASSWORD_REGEX);

// export function withRouter(Children) {
//     return (props) => {

//         const useRefs = { userRef: useRef(), errRef: useRef() };
//         return <Children {...props} useRefs={useRefs} />
//     }
// }

export function withRouter(Children) {
    return (props) => {

        const match = { navigate: useNavigate() };
        return <Children {...props} match={match} />
    }
}

class SignupComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            validity: {
                validUsername: false,
                validEmail: false,
                validPassword: false,
                validConfirmPassword: false
            },
            focuses: {
                usernameFocus: false,
                emailFocus: false,
                passwordFocus: false,
                confirmPasswordFocus: false
            },
            errMsgs: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                service: ''
            },
            success: false
        }
    }

    handleFocus = (event) => {
        let focuses = { ...this.state.focuses };
        const { id } = event.target;
        switch (id) {
            case "username":
                focuses.usernameFocus = true;
                break;
            case "email":
                focuses.emailFocus = true;
                break;
            case "password":
                focuses.passwordFocus = true;
                break;
            case "confirm_pwd":
                focuses.confirmPasswordFocus = true;
                break;
            default:
                break;
        }

        this.setState({ focuses });
    }

    handleBlur = (event) => {
        let validity = { ...this.state.validity };
        let focuses = { ...this.state.focuses };
        let errMsgs = { ...this.state.errMsgs };
        const { id, value } = event.target;
        switch (id) {
            case "username":
                focuses.usernameFocus = false;
                validity.validUsername = userRegExp.test(value);
                if (value.length < 3 || value.length > 23) {
                    errMsgs.username = properties.USERNAME_LENGTH_ERROR;
                } else if (!validity.validUsername) {
                    errMsgs.username = properties.USERNAME_INVALID;
                } else {
                    errMsgs.username = '';
                }
                break;
            case "email":
                focuses.emailFocus = false;
                validity.validEmail = emailRegExp.test(value);
                if (!validity.validEmail) {
                    errMsgs.email = properties.EMAIL_INVALID;
                } else {
                    errMsgs.email = '';
                }
                break;
            case "password":
                focuses.passwordFocus = false;
                validity.validPassword = passwordRegExp.test(value);
                if (value.length < 8 || value.length > 24) {
                    errMsgs.password = properties.PASSWORD_LENGTH_ERROR;
                } else if (!validity.validPassword) {
                    errMsgs.password = properties.PASSWORD_WEAK;
                } else {
                    errMsgs.password = '';
                }
                break;
            case "confirm_pwd":
                focuses.confirmPasswordFocus = false;
                validity.validConfirmPassword = this.state.password === value;
                errMsgs.confirmPassword = !validity.validConfirmPassword ? properties.CONFIRM_PASSWORD_ERROR : "";
                break;
            default:
                break;
        }

        this.setState({ focuses, validity, errMsgs });
    }

    getTitle = () => {
        return <h3 className="text-center">Sign up</h3>;
    }

    getErrorIcon = () => {
        return <FontAwesomeIcon icon={faInfoCircle} color="red" />
    }

    signIn = () => {
        this.props.match.navigate(`/`);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let user = { username: this.state.username, email: this.state.email, password: this.state.password };
        console.log(JSON.stringify(user));
        SignupAndLoginService.signUp(user).then(res => {
            localStorage.setItem('user', res.data);

            const loggedInUser = localStorage.getItem("user");
            alert(JSON.stringify(loggedInUser));
            this.setState({ success: true });

            //clear state and controlled inputs
            this.setState({ username: "" });
            this.setState({ email: "" });
            this.setState({ password: "" });
            this.setState({ confirmPassword: "" });
            this.props.match.navigate(`/${configData.CUSTOMERS}`);
        });
    };

    render() {
        const { errMsgs, username, email, password, confirmPassword, validity, focuses } = this.state;
        const { validUsername, validEmail, validPassword, validConfirmPassword } = validity;
        const { usernameFocus, emailFocus, passwordFocus, confirmPasswordFocus } = focuses;
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <pre>{JSON.stringify(this.state)}</pre>
                        <div className="card-body">
                            <section>
                                {this.getTitle()}
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
                                            aria-invalid={!validUsername}
                                            aria-describedby="uidnote"
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                        />
                                        <p
                                            id="uidnote"
                                            className={
                                                username && !validUsername
                                                    ? "instructions"
                                                    : "offscreen"
                                            }
                                        >
                                            {username && errMsgs.username ? this.getErrorIcon() : ''}
                                            {errMsgs.username ? errMsgs.username : !username || usernameFocus ? properties.USERNAME_HELP : ''}
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            Email Address:
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            autoComplete="off"
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                            value={email}
                                            required
                                            aria-invalid={!validEmail}
                                            aria-describedby="uidnote"
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                        />
                                        <p
                                            id="uidnote"
                                            className={
                                                email && !validEmail
                                                    ? "instructions"
                                                    : "offscreen"
                                            }
                                        >
                                            {email && errMsgs.email ? this.getErrorIcon() : ''}
                                            {errMsgs.email ? errMsgs.email : ''}
                                        </p>
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
                                            aria-invalid={!validPassword}
                                            aria-describedby="pwdnote"
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                        />
                                        <p
                                            id="pwdnote"
                                            className={
                                                passwordFocus && !validPassword
                                                    ? "instructions"
                                                    : "offscreen"
                                            }
                                        >
                                            {password && errMsgs.password ? this.getErrorIcon() : ''}
                                            {errMsgs.password ? errMsgs.password : !password || passwordFocus ? properties.PASSWORD_HELP : ''}
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="confirm_pwd">
                                            Confirm Password:
                                        </label>
                                        <input
                                            type="password"
                                            id="confirm_pwd"
                                            onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                            value={confirmPassword}
                                            required
                                            aria-invalid={!validConfirmPassword}
                                            aria-describedby="confirmnote"
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                        />
                                        <p
                                            id="confirmnote"
                                            className={
                                                confirmPasswordFocus && !validConfirmPassword
                                                    ? "instructions"
                                                    : "offscreen"
                                            }
                                        >
                                            {confirmPassword && errMsgs.confirmPassword ? this.getErrorIcon() : ''}
                                            {errMsgs.confirmPassword}
                                        </p>
                                    </div>
                                    <button>
                                        Sign Up
                                    </button>
                                </form>
                            </section>
                        </div>
                        <div>
                            <p>
                                Already registered?

                                <button onClick={this.signIn}>Sign in instead</button>
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignupComponent);
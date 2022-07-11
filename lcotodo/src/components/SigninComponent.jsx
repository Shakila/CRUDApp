import React, { useRef, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { properties } from '../properties.js';
import { useNavigate } from "react-router-dom";
import configData from "../config.json";

const userRegExp = RegExp(properties.USER_REGEX);
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

class SigninComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            validity: {
                validUsername: false,
                validPassword: false,
                validConfirmPassword: false
            },
            focuses: {
                usernameFocus: false,
                passwordFocus: false,
                confirmPasswordFocus: false
            },
            errMsgs: {
                username: '',
                password: '',
                confirmPassword: ''
            },
            success: false
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
    };

    handleFocus = (event) => {
        let focuses = { ...this.state.focuses };
        const { id } = event.target;
        switch (id) {
            case "username":
                focuses.usernameFocus = true;
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
        return <h3 className="text-center">Sign in</h3>;
    }

    getErrorIcon = () =>  {
        return <FontAwesomeIcon icon={faInfoCircle} color="red" />
    }

    signUp = () => {
        const path = configData.SIGNUP;
        this.props.match.navigate(`/${path}`);
    }

    render() {
        const { errMsgs, username, password, confirmPassword, validity, focuses } = this.state;
        const { validUsername, validPassword, validConfirmPassword } = validity;
        const { usernameFocus, passwordFocus, confirmPasswordFocus } = focuses;
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <pre>{JSON.stringify(this.state)}</pre>
                        <div className="card-body">
                            <section>
                                {this.getTitle()}
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
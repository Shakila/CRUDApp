import axios from 'axios';
import { properties } from '../properties';
import configData from "../config.json";

const AUTH_API_BASE_URL = configData.AUTH_API_BASE_URL;

class SignupAndLoginService {
    signUp(user) {
        try {
            console.log(user.username + "" + user.password);
            const response = axios.post(
                AUTH_API_BASE_URL + "/signup",
                user,
                {
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );
            return response;
        } catch (err) {
            if (!err?.response) {
                console.error(properties.NO_SERVER_RESPONSE);
            } else if (err.response?.status === 409) {
                console.error(properties.USERNAME_NOT_AVAILABLE);
            } else {
                console.error(properties.SIGNUP_FAILED);
            }
            // errRef.current.focus();
        }
    }
    signIn() {
        try{
            
        } catch (err) {
            //  if (response.status.code === 403) {
            //     console.error('ACCESS DENIED: You are not authorized');
            // }
            //  else {
            //     console.error();
            // }
            // errRef.current.focus();
        }   
    }
}

export default new SignupAndLoginService()
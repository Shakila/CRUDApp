import axios from 'axios';
import configData from "../config.json";

const CUSTOMER_API_BASE_URL = configData.CUSTOMER_API_BASE_URL;

class CustomerService {
    getCustomers() {
        return axios.get(CUSTOMER_API_BASE_URL);
    }

    createCustomer(customer) {
        return axios.post(CUSTOMER_API_BASE_URL, customer);
    }

    getCustomerById(customerId) {
        return axios.get(CUSTOMER_API_BASE_URL + "/" + customerId);
    }

    updateCustomer(customerId, customer) {
        return axios.put(CUSTOMER_API_BASE_URL + "/" + customerId, customer);
    }

    deleteCustomer(customerId) {
        return axios.delete(CUSTOMER_API_BASE_URL + "/" + customerId);
    }
}

export default new CustomerService()

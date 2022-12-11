import axios from "axios"
import {urlParams} from "../utilities/Utils";

export default class CustomerService {

    signup(data) {
        return axios.post(`http://localhost:8080/api/v1/customer/create?${urlParams(data)}`, null, {headers: {"Accept-Language": "TR"}})
    }

    get(email) {
        return axios.get(`http://localhost:8080/api/v1/customer/get/one/fully_joined/by_username?${urlParams({username: email})}`, {headers: {"Accept-Language": "TR"}})
    }

}
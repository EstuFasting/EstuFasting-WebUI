import axios from "axios"
import {urlParams} from "../utilities/utils";
import {getToken} from "../localStorage";

export default class CustomerService {

    signup(data) {
        return axios.post(`https://estufasting-restapi-production.up.railway.app/api/v1/customer/create`, data, {headers: {"Accept-Language": "TR"}});
    }

    get(email) {
        return axios.get(`https://estufasting-restapi-production.up.railway.app/api/v1/customer/get/one/fully_joined/by_username?${urlParams({username: email})}`, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        });
    }

}
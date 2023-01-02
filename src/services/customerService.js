import axios from "axios"
import {urlParams} from "../utilities/utils";
import {getToken} from "../localStorage";
import i18n from "../i18next";

export default class CustomerService {

    signup(data) {
        return axios.post(`https://estufasting-restapi-production.up.railway.app/api/v1/customer/create`, data, {headers: {"Accept-Language": i18n.language}});
    }

    get(email) {
        return axios.get(`https://estufasting-restapi-production.up.railway.app/api/v1/customer/get/one/fully_joined/by_username?${urlParams({username: email})}`, {
            headers: {
                "Accept-Language": i18n.language,
                'Authorization': getToken()
            }
        });
    }

}
import axios from "axios";
import {getToken} from "../localStorage";

export default class DiningHallService {

    get() {
        return axios.get(`http://localhost:8080/api/v1/dining_hall/get/list/quick`, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        })
    }

}
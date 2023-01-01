import axios from "axios";

export default class DiningHallService {

    get() {
        return axios.get(`https://estufasting-restapi-production.up.railway.app/api/v1/dining_hall/get/list/quick`, {
            headers: {
                "Accept-Language": "TR"
            }
        })
    }

}
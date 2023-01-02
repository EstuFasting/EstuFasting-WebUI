import axios from "axios";
import i18n from "../i18next";

export default class DiningHallService {

    get() {
        return axios.get(`https://estufasting-restapi-production.up.railway.app/api/v1/dining_hall/get/list/quick`, {
            headers: {
                "Accept-Language":  i18n.language
            }
        })
    }

}
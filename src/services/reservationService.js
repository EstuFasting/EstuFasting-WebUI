import axios from "axios"
import {getToken} from "../localStorage";
import {urlParams} from "../utilities/utils";

export default class ReservationService {

    makeReservation(data) {
        return axios.post(`http://localhost:8080/api/v1/reservation/create`, data, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        });
    }

    makeReservationMultiple(data) {
        return axios.post(`http://localhost:8080/api/v1/reservation/create/multiple`, data, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        });
    }

    cancelReservation(id) {
        return axios.delete(`http://localhost:8080/api/v1/reservation/delete?${urlParams({id: id})}`, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        });
    }

    completePaymentsMultiple(data) {
        return axios.put(`http://localhost:8080/api/v1/reservation/update/complete_reservation_payments`, data, {
            headers: {
                "Accept-Language": "TR",
                'Authorization': getToken()
            }
        });
    }

}
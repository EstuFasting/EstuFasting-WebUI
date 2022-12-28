import axios from "axios"

export default class AuthService {

    login(tcknOrEmail, password) {
        return axios.post(`https://estufasting-restapi-production.up.railway.app/api/v1/auth/login/customer`, {identifier: tcknOrEmail, password: password}, {headers: {"Accept-Language": "TR"}})
    }

}
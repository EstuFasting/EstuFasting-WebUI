import axios from "axios"

export default class AuthService {

    login(tcknOrEmail, password) {
        return axios.post(`http://localhost:8080/api/v1/auth/login/customer`, {identifier: tcknOrEmail, password: password}, {headers: {"Accept-Language": "TR"}})
    }

}
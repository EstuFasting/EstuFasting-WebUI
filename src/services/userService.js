import axios from "axios"
import {urlParams} from "../utilities/Utils";

export default class UserService {

    delete(email) {
        return axios.delete(`http://localhost:8080/api/v1/user/delete?${urlParams({username: email})}`, {headers: {"Accept-Language": "TR"}})
    }

    updateUsername(email, newUsername) {
        return axios.put(`http://localhost:8080/api/v1/user/update/username?${urlParams({
            username: email,
            newUsername: newUsername
        })}`, null, {headers: {"Accept-Language": "TR"}})
    }

    updatePassword(email, password) {
        return axios.put("http://localhost:8080/api/v1/user/update/password", {
            username: email,
            password: password
        }, {headers: {"Accept-Language": "TR"}})
    }

    updateFirstName(email, firstName) {
        return axios.put(`http://localhost:8080/api/v1/user/update/first_name?${urlParams({
            username: email,
            firstName: firstName
        })}`, null, {headers: {"Accept-Language": "TR"}})
    }

    updateLastName(email, lastName) {
        return axios.put(`http://localhost:8080/api/v1/user/update/last_name?${urlParams({
            username: email,
            lastName: lastName
        })}`, null, {headers: {"Accept-Language": "TR"}})
    }

    updateBirthDate(email, birthDate) {
        return axios.put(`http://localhost:8080/api/v1/user/update/birth_date?${urlParams({
            username: email,
            birthDate: birthDate
        })}`, null, {headers: {"Accept-Language": "TR"}})
    }

    updatePhoneNumber(email, phoneNumber) {
        return axios.put(`http://localhost:8080/api/v1/user/update/phone_number?${urlParams({
            username: email,
            phoneNumber: phoneNumber
        })}`, null, {headers: {"Accept-Language": "TR"}})
    }

    updateLanguage(email, languageId) {
        return axios.put(`http://localhost:8080/api/v1/user/update/language?${urlParams({
            username: email,
            languageId: languageId
        })}`, null, {headers: {"Accept-Language": "TR"}})
    }

}
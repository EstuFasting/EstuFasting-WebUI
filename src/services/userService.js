import axios from "axios"
import {urlParams} from "../utilities/utils";
import {getToken} from "../localStorage";
import i18n from "../i18next";

export default class UserService {

    delete(email) {
        return axios.delete(`https://estufasting-restapi-production.up.railway.app/api/v1/user/delete?${urlParams({username: email})}`, {
            headers: {
                "Accept-Language":  i18n.language,
                'Authorization': getToken()
            }
        })
    }

    updateUsername(email, newUsername) {
        return axios.put(`https://estufasting-restapi-production.up.railway.app/api/v1/user/update/username?${urlParams({
            username: email,
            newUsername: newUsername
        })}`, null, {headers: {"Accept-Language":  i18n.language, 'Authorization': getToken()}})
    }

    updatePassword(email, password) {
        return axios.put("https://estufasting-restapi-production.up.railway.app/api/v1/user/update/password", {
            username: email,
            password: password
        }, {headers: {"Accept-Language":  i18n.language, 'Authorization': getToken()}})
    }

    updateFirstName(email, firstName) {
        return axios.put(`https://estufasting-restapi-production.up.railway.app/api/v1/user/update/first_name?${urlParams({
            username: email,
            firstName: firstName
        })}`, null, {headers: {"Accept-Language":  i18n.language, 'Authorization': getToken()}})
    }

    updateLastName(email, lastName) {
        return axios.put(`https://estufasting-restapi-production.up.railway.app/api/v1/user/update/last_name?${urlParams({
            username: email,
            lastName: lastName
        })}`, null, {headers: {"Accept-Language":  i18n.language, 'Authorization': getToken()}})
    }

    updateBirthDate(email, birthDate) {
        return axios.put(`https://estufasting-restapi-production.up.railway.app/api/v1/user/update/birth_date?${urlParams({
            username: email,
            birthDate: birthDate
        })}`, null, {headers: {"Accept-Language":  i18n.language, 'Authorization': getToken()}})
    }

    updatePhoneNumber(email, phoneNumber) {
        return axios.put(`https://estufasting-restapi-production.up.railway.app/api/v1/user/update/phone_number?${urlParams({
            username: email,
            phoneNumber: phoneNumber
        })}`, null, {headers: {"Accept-Language":  i18n.language, 'Authorization': getToken()}})
    }

    updateLanguage(email, languageId) {
        return axios.put(`https://estufasting-restapi-production.up.railway.app/api/v1/user/update/language?${urlParams({
            username: email,
            languageId: languageId
        })}`, null, {headers: {"Accept-Language":  i18n.language, 'Authorization': getToken()}})
    }

}
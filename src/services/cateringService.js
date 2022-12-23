import axios from "axios"
import {urlParams} from "../utilities/utils";
import {getToken} from "../localStorage";
import {addDays, getFirstDayOfThisWeek, dateToDateString} from "../utilities/dateUtils";

export default class CateringService {

    getReservationPageData(lower, upper, pageSize = 28 * 3) {
        if (lower === undefined) lower = getFirstDayOfThisWeek();
        if (upper === undefined) upper = addDays(lower, 4 * 7);
        return axios.get(`http://localhost:8080/api/v1/catering/get/list/fully_joined/date_between?${urlParams({
            pageSize: pageSize,
            "sort.orders%5B0%5D.direction": "ASC",
            "sort.orders%5B0%5D.property": "date",
            lower: dateToDateString(lower),
            upper: dateToDateString(upper)
        })}`, {headers: {"Accept-Language": "TR", 'Authorization': getToken()}})
    }

}
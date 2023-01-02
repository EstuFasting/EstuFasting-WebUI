import {toast} from "react-toastify";
import i18n from "../i18next";

export const handleCatch = (error) => {
    const resp = error.response
    if (!resp || !resp.data) {
        toast.error(i18n.t("Something went wrong") +" 🙁");
        return false;
    }
    if (resp.data.data) {
        Object.entries(resp.data.data).forEach((prop) => toast.warning(String(prop[1].message)));
        return true;
    }
    if (resp.data.message) {
        toast.warning(resp.data.message);
        return true;
    }
    return false;
}

export const urlParams = (data) => {
    let urlParams = "";
    for (const entry of Object.entries(data)) {
        const key = entry[0], value = entry[1];
        urlParams += `${key}=${value}&`
    }
    return urlParams.slice(0, -1);
}

export const changePropInList = (propId, newProp, propList) => {
    const index = propList.findIndex(prop => prop.id === propId);
    propList[index] = newProp;
    return propList;
}

export const getByFieldName = (object, fieldName) => {
    if (!fieldName) return object;
    return Object.values(object)[Object.keys(object).indexOf(String(fieldName))];
}

export const classNames = (classes) => {
    let result = "";
    for (const clazz of Object.keys(classes))
        if (getByFieldName(classes, clazz) === true)
            result += `${clazz} `;
    return result;
}

export const range = (size, startAt = 0) => {
    return [...Array(size).keys()].map(i => i + startAt);
}


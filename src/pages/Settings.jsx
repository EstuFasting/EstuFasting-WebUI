import React, {useState} from 'react';
import {Icon} from "semantic-ui-react";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import UserService from "../services/userService";
import {signOut, syncUser} from "../store/actions/userActions";
import {classNames, handleCatch} from "../utilities/utils";
import {toast} from "react-toastify";
import {removeToken} from "../localStorage";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

function Settings(props) {

    const userService = new UserService();

    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const user = useSelector(state => state?.user.userProps.user);
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            phoneNumber: user.phoneNumber,
            username: user.username
        },
        enableReinitialize: true
    });

    const submitFirstName = () => {
        if (loading || !formik.values.firstName || formik.values.firstName === user.firstName) return
        setLoading(true)
        userService.updateFirstName(user.username, formik.values.firstName).then(() => {
            dispatch(syncUser({...user, firstName: formik.values.firstName}))
            toast.success(t("Saved"))
        }).catch(handleCatch).finally(() => setLoading(false))
    }

    const submitLastName = () => {
        if (loading || !formik.values.lastName || formik.values.lastName === user.lastName) return
        setLoading(true)
        userService.updateLastName(user.username, formik.values.lastName).then(() => {
            dispatch(syncUser({...user, lastName: formik.values.lastName}))
            toast.success(t("Saved"))
        }).catch(handleCatch).finally(() => setLoading(false))
    }

    const submitBirthDate = () => {
        if (loading || !formik.values.birthDate || formik.values.birthDate === user.birthDate) return
        setLoading(true)
        userService.updateBirthDate(user.username, formik.values.birthDate).then(() => {
            dispatch(syncUser({...user, birthDate: formik.values.birthDate}))
            toast.success(t("Saved"))
        }).catch(handleCatch).finally(() => setLoading(false))
    }

    const submitPhoneNumber = () => {
        if (loading || !formik.values.phoneNumber || formik.values.phoneNumber === user.phoneNumber) return
        setLoading(true)
        userService.updatePhoneNumber(user.username, formik.values.phoneNumber).then(() => {
            dispatch(syncUser({...user, phoneNumber: formik.values.phoneNumber}))
            toast.success(t("Saved"))
        }).catch(handleCatch).finally(() => setLoading(false))
    }

    const submitUsername = () => {
        if (loading || !formik.values.username || formik.values.username === user.username) return
        setLoading(true)
        userService.updateUsername(user.username, formik.values.username).then(() => {
            dispatch(syncUser({...user, username: formik.values.username}))
            history.push("/")
            dispatch(signOut());
            removeToken();
            toast.success(t("Saved") + ". "+ t("Please login again") + ".")
        }).catch(handleCatch).finally(() => setLoading(false))
    }

    return (
        <div className="shadow px-3 px-lg-5 py-3 pb-5 rounded-5 settings-segment" style={{marginBottom: 200}}>
            <h3 className={"mt-5 mb-0"} style={{color: "#810d0d"}}>{t("Account Settings")}</h3>
            <div className={"fasting-form mt-2 mb-2"}>
                <div className="row">
                    <div className="col-md">
                        <label htmlFor="firstName" className="settings-field-label">{t("Name")}</label>
                        <input id="firstName" type="text" name={"firstName"} onChange={formik.handleChange}
                               value={formik.values.firstName} placeholder={t("Enter Name")} required
                               className="settings-field"/>
                        <button className={`save ${classNames({disabled: formik.values.firstName === user.firstName})}`}
                                onClick={submitFirstName}><Icon name="check"/>
                        </button>
                    </div>
                    <div className="col-md">
                        <label htmlFor="lastName" className="settings-field-label">{t("Surname")}</label>
                        <input id="lastName" type="text" name={"lastName"} onChange={formik.handleChange}
                               value={formik.values.lastName} placeholder={t("Enter Surname")} required
                               className="settings-field"/>
                        <button className={`save ${classNames({disabled: formik.values.lastName === user.lastName})}`}
                                onClick={submitLastName}><Icon name="check"/>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <label htmlFor="birthDate" className="settings-field-label">{t("Birth Date")}</label>
                        <input id="birthDate" type="date" name={"birthDate"} onChange={formik.handleChange}
                               value={formik.values.birthDate} placeholder={t("Enter Birth Date")} required
                               className="settings-field"/>
                        <button className={`save ${classNames({disabled: formik.values.birthDate === user.birthDate})}`}
                                onClick={submitBirthDate}><Icon name="check"/>
                        </button>
                    </div>
                    <div className="col-md">
                        <label htmlFor="username" className="settings-field-label">{t("E-mail")}</label>
                        <input id="username" type="text" name={"username"} onChange={formik.handleChange}
                               value={formik.values.username} placeholder={t("Enter E-mail")} required
                               className="settings-field"/>
                        <button className={`save ${classNames({disabled: formik.values.username === user.username})}`}
                                onClick={submitUsername}><Icon name="check"/>
                        </button>

                    </div>
                </div>
                {/*
                <label htmlFor="phoneNumber" className="settings-field-label">Telefon Numarası</label>
                        <input id="phoneNumber" type="text" name={"phoneNumber"} onChange={formik.handleChange}
                               value={formik.values.phoneNumber} placeholder="Telefon Numarası Giriniz" required
                               className="settings-field"/>
                        <button className="save" onClick={submitPhoneNumber}><Icon name="check"/></button>
                */}
                <div className="container m-5"/>
            </div>
        </div>
    );
}

export default Settings;
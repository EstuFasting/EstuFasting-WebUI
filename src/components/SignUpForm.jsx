import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {setToken} from "../localStorage";
import {syncUser} from "../store/actions/userActions";
import {toast} from "react-toastify";
import {handleCatch} from "../utilities/utils";
import React, {useState} from "react";
import CustomerService from "../services/customerService";
import {Icon} from "semantic-ui-react";
import {useTranslation} from "react-i18next";

export default function SignUpForm() {

    const customerService = new CustomerService();

    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            tckn: "",
            username: "",
            password: "",
            passwordRepeated: "",
            languageId: 59
        },
        onSubmit: (values) => {
            if (loading) return;
            if (values.password !== values.passwordRepeated) {
                toast.error(t("Passwords are not matching"))
                return
            }
            setLoading(true)
            customerService.signup(values)
                .then(response => {
                    setToken(response.headers.authorization)
                    dispatch(syncUser(response.data.data));
                    history.push("/")
                    toast(t("Welcome"), {autoClose: 2500})
                }).catch(handleCatch).finally(() => setLoading(false))
        },
        enableReinitialize: true
    });

    return (
        <div>
            <h3 className={"mt-5 mb-0"}>{t("Sign Up")}</h3>
            <form className={"fasting-form mt-2 mb-2"} onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">{t("Name")}</label>
                <input id="firstName" type="text" name={"firstName"} onChange={formik.handleChange}
                       value={formik.values.firstName} placeholder={t("Enter Name")} required/>
                <label htmlFor="email">{t("Surname")}</label>
                <input id="lastName" type="text" name={"lastName"} onChange={formik.handleChange}
                       value={formik.values.lastName} placeholder={t("Enter Surname")} required/>
                <label htmlFor="email">{t("Tckn")}</label>
                <input id="tckn" type="text" name={"tckn"} onChange={formik.handleChange}
                       value={formik.values.tckn} placeholder={t("Enter Tckn")} required/>
                <label htmlFor="username">{t("E-mail")}</label>
                <input id="username" type="text" name={"username"} onChange={formik.handleChange}
                       value={formik.values.username} placeholder={t("Enter E-mail")} required/>
                <div className={"fasting-form-field"}>
                    <label htmlFor="password">{t("Password")}</label>
                    {showPassword ?
                        <Icon name="eye" className="password-toggle" corner onClick={() => setShowPassword(!showPassword)}/>:
                        <Icon name="eye slash" className="password-toggle" corner onClick={() => setShowPassword(!showPassword)}/>}
                    <input id="password" type={showPassword ? "text" : "password"} name={"password"} onChange={formik.handleChange}
                           value={formik.values.password} placeholder={t("Enter Password")} required autoComplete="new-password"/>
                </div>
                <div className={"fasting-form-field"}>
                    <label htmlFor="passwordRepeated">{t("Password Repeat")}</label>
                    {showPassword ?
                        <Icon name="eye" className="password-toggle" corner onClick={() => setShowPassword(!showPassword)}/>:
                        <Icon name="eye slash" className="password-toggle" corner onClick={() => setShowPassword(!showPassword)}/>}
                    <input id="passwordRepeated" type={showPassword ? "text" : "password"} name={"passwordRepeated"} onChange={formik.handleChange}
                           value={formik.values.passwordRepeated} placeholder={t("Enter Password Repeat")} required/>
                </div>
                <div className="container m-5"/>
                <button className={"mt-5 container-fluid"} type={"submit"}>
                    {loading ? <Icon name="circle notch" loading size="large"/> : t("Complete Sign Up")}
                </button>
            </form>
            <div className="text-center">
                <span style={{fontSize: "13px"}}>2022© {t("All Rights Reserved")}. {t("Eskisehir Technical University")}</span>
            </div>
        </div>
    )

}

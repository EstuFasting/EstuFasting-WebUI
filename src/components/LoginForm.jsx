import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {getToken, setToken} from "../localStorage";
import {syncUser} from "../store/actions/userActions";
import {toast} from "react-toastify";
import AuthService from "../services/authService";
import {Icon} from "semantic-ui-react";
import {useTranslation} from "react-i18next";

function LoginForm() {

    const authService = new AuthService();

    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            tcknOrEmail: "", password: ""
        },
        onSubmit: (values) => {
            if (loading) return;
            setLoading(true)
            authService.login(values.tcknOrEmail, values.password)
                .then(response => {
                    setToken(response.headers.authorization)
                    dispatch(syncUser(response.data.data));
                    history.push("/")
                    toast(t("Welcome"), {autoClose: 2500})
                }).catch(() => toast.error(t("Please check your entries"))).finally(() => setLoading(false))
        }
    });

    if (getToken()) history.push("/")

    return (
        <div>
            <h3 className={"mt-5 mb-0"}>{t("Login")}</h3>
            <form className={"fasting-form mt-2 mb-2"} onSubmit={formik.handleSubmit}>
                <label htmlFor="email">{t("Tckn Or Email")}</label>
                <input id="email" type="text" name={"tcknOrEmail"} onChange={formik.handleChange}
                       value={formik.values.tcknOrEmail} placeholder={t("Enter Tckn Or Email")}
                       required/>
                <div className={"fasting-form-field"}>
                    <label htmlFor="password">{t("Password")}</label>
                    {showPassword ?
                        <Icon name="eye" className="password-toggle" corner
                              onClick={() => setShowPassword(!showPassword)}/> :
                        <Icon name="eye slash" className="password-toggle" corner
                              onClick={() => setShowPassword(!showPassword)}/>}
                    <input id="password" type={showPassword ? "text" : "password"} name={"password"}
                           onChange={formik.handleChange} value={formik.values.password}
                           placeholder={t("Enter Password")} required/>
                </div>
                <label className="checkbox-container">{t("Remember Me")}
                    <input type="checkbox" defaultChecked/>
                    <span className="checkmark"></span>
                </label>
                <button className={"mt-5 container-fluid"} type={"submit"}>
                    {loading ? <Icon name="circle notch" loading size="large"/> : t("Complete Login")}
                </button>
            </form>
            <div className="text-center">
                <span style={{fontSize: "13px"}}>2022© {t("All Rights Reserved")}. {t("Eskisehir Technical University")}</span>
            </div>
        </div>
    );
}

export default LoginForm;
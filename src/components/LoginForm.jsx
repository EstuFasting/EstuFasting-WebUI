import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {getToken, setToken} from "../localStorage";
import {syncUser} from "../store/actions/userActions";
import {toast} from "react-toastify";
import AuthService from "../services/authService";
import {Icon} from "semantic-ui-react";

function LoginForm() {

    const authService = new AuthService();

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
                    toast("Hoşgeldiniz", {autoClose: 2500})
                }).catch(() => toast.error("Lütfen girdiğiniz değerleri kontrol edin")).finally(() => setLoading(false))
        }
    });

    if (getToken()) history.push("/")

    return (
        <div>
            <h3 className={"mt-5 mb-0"}>Giriş yap</h3>
            <form className={"fasting-form mt-2 mb-2"} onSubmit={formik.handleSubmit}>
                <label htmlFor="email">TC Kimlik No veya E-posta Adresi</label>
                <input id="email" type="text" name={"tcknOrEmail"} onChange={formik.handleChange}
                       value={formik.values.tcknOrEmail} placeholder="TC Kimlik No veya E-posta Adresi Giriniz"
                       required/>
                <div className={"fasting-form-field"}>
                    <label htmlFor="password">Şifre</label>
                    {showPassword ?
                        <Icon name="eye" className="password-toggle" corner
                              onClick={() => setShowPassword(!showPassword)}/> :
                        <Icon name="eye slash" className="password-toggle" corner
                              onClick={() => setShowPassword(!showPassword)}/>}
                    <input id="password" type={showPassword ? "text" : "password"} name={"password"}
                           onChange={formik.handleChange}
                           value={formik.values.password} placeholder="Şifre Giriniz" required/>
                </div>
                <label className="checkbox-container">Beni Hatırla
                    <input type="checkbox" checked/>
                    <span className="checkmark"></span>
                </label>
                <button className={"mt-5 container-fluid"} type={"submit"}>
                    {loading ? <Icon name="circle notch" loading size="large"/> : "Oturum Aç"}
                </button>
            </form>
            <div className="text-center">
                <span style={{fontSize: "13px"}}>2022© Tüm hakları saklıdır. Eskişehir Teknik Üniversitesi</span>
            </div>
        </div>
    );
}

export default LoginForm;
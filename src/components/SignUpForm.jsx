import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import {setToken} from "../localStorage";
import {syncUser} from "../store/actions/userActions";
import {toast} from "react-toastify";
import {handleCatch} from "../utilities/utils";
import React from "react";
import CustomerService from "../services/customerService";

export default function SignUpForm() {

    const customerService = new CustomerService();

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
            if (values.password !== values.passwordRepeated) {
                toast.error("Şifreler eşleşmiyor")
                return
            }
            customerService.signup(values)
                .then(response => {
                    console.log(response.data)
                    setToken(response.headers.authorization)
                    dispatch(syncUser(response.data.data));
                    history.push("/")
                    toast("Aramıza Hoşgeldiniz", {autoClose: 2500})
                }).catch(handleCatch)
        },
        enableReinitialize: true
    });

    return (
        <div>
            <h3 className={"mt-5 mb-0"}>Kayıt Ol</h3>
            <form className={"fasting-form mt-2 mb-2"} onSubmit={formik.handleSubmit}>
                <label htmlFor="firstName">İsim</label>
                <input id="firstName" type="text" name={"firstName"} onChange={formik.handleChange}
                       value={formik.values.firstName} placeholder="İsim Giriniz" required/>
                <label htmlFor="email">Soyisim</label>
                <input id="lastName" type="text" name={"lastName"} onChange={formik.handleChange}
                       value={formik.values.lastName} placeholder="Soyisim Giriniz" required/>
                <label htmlFor="email">TC Kimlik No</label>
                <input id="tckn" type="text" name={"tckn"} onChange={formik.handleChange}
                       value={formik.values.tckn} placeholder="TC Kimlik No Giriniz" required/>
                <label htmlFor="username">E-posta</label>
                <input id="username" type="text" name={"username"} onChange={formik.handleChange}
                       value={formik.values.username} placeholder="E-posta Giriniz" required/>
                <label htmlFor="password">Şifre</label>
                <input id="password" type="password" name={"password"} onChange={formik.handleChange}
                       value={formik.values.password} placeholder="Şifre Giriniz" required/>
                <label htmlFor="passwordRepeated">Şifre Tekrar</label>
                <input id="passwordRepeated" type="password" name={"passwordRepeated"} onChange={formik.handleChange}
                       value={formik.values.passwordRepeated} placeholder="Şifreyi Tekrar Giriniz" required/>
                <div className="container m-5"/>
                <button className={"mt-5 container-fluid"} type={"submit"}>Kaydı Tamamla</button>
            </form>
            <div className="text-center">
                <span style={{fontSize: "13px"}}>2022© Tüm hakları saklıdır. Eskişehir Teknik Üniversitesi</span>
            </div>
        </div>
    )

}

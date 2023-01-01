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

export default function SignUpForm() {

    const customerService = new CustomerService();

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
                toast.error("Şifreler eşleşmiyor")
                return
            }
            setLoading(true)
            customerService.signup(values)
                .then(response => {
                    console.log(response.data)
                    setToken(response.headers.authorization)
                    dispatch(syncUser(response.data.data));
                    history.push("/")
                    toast("Aramıza Hoşgeldiniz", {autoClose: 2500})
                }).catch(handleCatch).finally(() => setLoading(false))
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
                <div className={"fasting-form-field"}>
                    <label htmlFor="password">Şifre</label>
                    {showPassword ?
                        <Icon name="eye" className="password-toggle" corner onClick={() => setShowPassword(!showPassword)}/>:
                        <Icon name="eye slash" className="password-toggle" corner onClick={() => setShowPassword(!showPassword)}/>}
                    <input id="password" type={showPassword ? "text" : "password"} name={"password"} onChange={formik.handleChange}
                           value={formik.values.password} placeholder="Şifre Giriniz" required autoComplete="new-password"/>
                </div>
                <div className={"fasting-form-field"}>
                    <label htmlFor="passwordRepeated">Şifre Tekrar</label>
                    {showPassword ?
                        <Icon name="eye" className="password-toggle" corner onClick={() => setShowPassword(!showPassword)}/>:
                        <Icon name="eye slash" className="password-toggle" corner onClick={() => setShowPassword(!showPassword)}/>}
                    <input id="passwordRepeated" type={showPassword ? "text" : "password"} name={"passwordRepeated"} onChange={formik.handleChange}
                           value={formik.values.passwordRepeated} placeholder="Şifreyi Tekrar Giriniz" required/>
                </div>
                <div className="container m-5"/>
                <button className={"mt-5 container-fluid"} type={"submit"}>
                    {loading ? <Icon name="circle notch" loading size="large"/> : "Kaydı Tamamla"}
                </button>
            </form>
            <div className="text-center">
                <span style={{fontSize: "13px"}}>2022© Tüm hakları saklıdır. Eskişehir Teknik Üniversitesi</span>
            </div>
        </div>
    )

}

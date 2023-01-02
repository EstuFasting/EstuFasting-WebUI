import loginImage from "../assets/images/login.jpg";
import signUpImage from "../assets/images/signup.png";
import LoginForm from "../components/LoginForm";
import {useState} from "react";
import SignUpForm from "../components/SignUpForm";
import {useTranslation} from "react-i18next";

export default function LoginAndSignUp() {

    const {t} = useTranslation();
    const [formFlag, setFormFlag] = useState(true);

    return (
        <div className="px-md-5">
            <div className="row mx-3 px-md-5 d-flex justify-content-center align-items-center">
                <div className="col-lg-7 d-none d-lg-block text-center">
                    {formFlag ?
                        <img className="container-fluid p-5" style={{paddingTop: 0, marginTop: "-30rem"}}
                             src={loginImage} alt="image"/> :
                        <img className="container-fluid p-5 signup-image" src={signUpImage} alt="image"/>}
                </div>
                <div className="col-lg-5" style={{height: "80rem"}}>
                    <div className="shadow rounded-4 p-5 m-4 bg-white bg-opacity-75">
                        <div className="sliding-radio-outer-wrapper">
                            <div className="sliding-radio-inner-wrapper">
                                <input type="radio" className="radio" name="radio" id="login" checked={formFlag}
                                       onChange={() => setFormFlag(!formFlag)}/>
                                <input type="radio" className="radio" name="radio" id="signup" checked={!formFlag}
                                       onChange={() => setFormFlag(!formFlag)}/>
                                <label className="tab login_tab" style={{fontWeight: 400}} htmlFor="login">
                                    {t("Login")}
                                </label>
                                <label className="tab signup_tab" style={{fontWeight: 400}} htmlFor="signup">
                                    {t("Sign Up")}
                                </label>
                                <span className="shape"></span>
                            </div>
                        </div>

                        {formFlag ? <LoginForm/> : <SignUpForm/>}
                    </div>
                </div>
            </div>
        </div>


    )
}


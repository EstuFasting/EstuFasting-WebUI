import {Route} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {ToastContainer} from "react-toastify";
import LoginAndSignUp from "../pages/LoginAndSignUp";
import SignUpForm from "../components/SignUpForm";
import Main from "../pages/Main";

export default function Dashboard() {

    return (
        <div>
            <Navbar/>
            <ToastContainer position={"bottom-left"} pauseOnFocusLoss={false} closeButton={null}/>
            <div>
                <Route exact path="/" component={Main}/>
                <Route exact path="/login" component={LoginAndSignUp}/>
                <Route exact path="/sign-up" component={SignUpForm}/>
            </div>
            <Footer/>
        </div>
    )
}


import {Route} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {ToastContainer} from "react-toastify";
import LoginAndSignUp from "../pages/LoginAndSignUp";
import SignUpForm from "../components/SignUpForm";
import Main from "../pages/Main";
import Calendar from "../pages/Calendar";
import Reservation from "../pages/Reservation";
import {classNames} from "../utilities/utils";
import {getToken} from "../localStorage";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Payment from "../pages/Payment";
import Settings from "../pages/Settings";

export default function Dashboard() {

    const user = useSelector(state => state?.user.userProps.user);
    const [loggedIn, setLoggedIn] = useState(getToken() !== null);

    useEffect(() => {
        setLoggedIn(getToken() !== null)
    }, [user])

    return (
        <div>
            <Navbar/>
            <ToastContainer position={"bottom-left"} pauseOnFocusLoss={false} closeButton={null}/>
            <div className={classNames({
                "signed-in-main-container": loggedIn,
                "signed-out-main-container": !loggedIn
            })}>
                <Route exact path="/" component={Main}/>
                <Route exact path="/calendar" component={Calendar}/>
                <Route exact path="/payment" component={Payment}/>
                <Route exact path="/settings" component={Settings}/>
                <Route exact path="/reservation" component={Reservation}/>
                <Route exact path="/login" component={LoginAndSignUp}/>
                <Footer/>
            </div>
        </div>
    )
}


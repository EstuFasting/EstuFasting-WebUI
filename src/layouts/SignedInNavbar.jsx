import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signOut, syncUser} from "../store/actions/userActions";
import {removeToken} from "../localStorage";
import {toast} from "react-toastify";
import logo from "../assets/images/signed-in-top-navbar-logo.png"
import estuLogoOnly from "../assets/images/estu-logo-only.png"
import trFlag from "../assets/images/flags/4x3/tr.svg"
import usFlag from "../assets/images/flags/4x3/gb.svg"
import {Icon} from "semantic-ui-react";
import {Link, useHistory} from "react-router-dom";
import {classNames, handleCatch} from "../utilities/utils";
import CustomerService from "../services/customerService";
import {useTranslation} from "react-i18next";

export default function SignedInNavbar() {

    const history = useHistory();
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
    const [activeTab, setActiveTab] = useState(history.location.pathname);


    const dispatch = useDispatch();
    const user = useSelector(state => state?.user.userProps.user);

    useEffect(() => {
        if (user.reservations && user.reservations.length > 0) return;
        const customerService = new CustomerService();
        customerService.get(user.username).then(response => {
            dispatch(syncUser(response.data.data));
        }).catch(handleCatch);
    }, []);

    history.listen((location, action) => {
        if (action === "PUSH")
            setActiveTab(location.pathname)
    });

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang).then(() => setLanguage(lang))
    };

    const handleLogOutClick = () => {
        history.push("/")
        dispatch(signOut());
        removeToken();
        toast.info("Çıkış Yapıldı");
    }

    return (
        <div>
            <div className="top-navbar-wrapper fixed-top">
                <nav className="top-navbar signed-in-top-navbar p-3">
                    <div className="signed-in-top-navbar-left-section">
                        <ul>
                            <li onClick={() => history.push("/")}><img width={500} src={logo} alt="logo"/></li>
                        </ul>
                    </div>
                    <div className="signed-in-top-navbar-right-section p-3">
                        <ul>
                            <li style={{fontWeight: 600}}>
                                <span>{`${user.firstName} ${user.lastName}`}</span>
                            </li>
                            <li>
                                <div className="vr float-start bg-black"
                                     style={{height: 30, marginTop: -2, width: 2, borderRadius: 5, opacity: .2}}/>
                            </li>
                            {language === "tr" ?
                                <li className="top-navbar-language-selection" onClick={() => changeLanguage("en")}>
                                    <img src={trFlag} className="d-inline float-start rounded m-1" alt="TR Flag"
                                         style={{width: 25}}/>
                                    <span>Türkçe</span>
                                </li> :
                                <li className="top-navbar-language-selection" onClick={() => changeLanguage("tr")}>
                                    <img src={usFlag} className="d-inline float-start rounded m-1" alt="USA Flag"
                                         style={{width: 25}}/>
                                    <span>English</span>
                                </li>
                            }
                            <li>
                                <Icon className="mb-1" name="sign-out" size="large" onClick={handleLogOutClick}/>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="top-navbar  signed-in-left-navbar d-flex flex-column flex-shrink-0 p-3">
                <img width={500} src={estuLogoOnly} alt="logo" className="my-5" style={{width: 90, marginLeft: 60}}/>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/calendar" className={classNames({
                            "nav-link": true,
                            "active": activeTab === "/calendar",
                            "link-dark": activeTab !== "/calendar"
                        })}>
                            <Icon name="clipboard list" size="large" className="mb-2 me-2"/>
                            {t("Calendar")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/reservation" className={classNames({
                            "nav-link": true,
                            "active": activeTab === "/reservation",
                            "link-dark": activeTab !== "/reservation"
                        })}>
                            <Icon name="calendar plus outline" size="large" className="mb-2 me-2"/>
                            {t("Make Reservation")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/payment" className={classNames({
                            "nav-link": true,
                            "active": activeTab === "/payment",
                            "link-dark": activeTab !== "/payment"
                        })}>
                            <Icon name="payment" size="large" className="mb-2 me-2"/>
                            {t("Payment")}
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className={classNames({
                            "nav-link": true,
                            "active": activeTab === "/settings",
                            "link-dark": activeTab !== "/settings"
                        })}>
                            <Icon name="setting" size="large" className="mb-2 me-2"/>
                            {t("Settings")}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )

}

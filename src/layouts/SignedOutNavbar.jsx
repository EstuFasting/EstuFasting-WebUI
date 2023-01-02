import React, {useState} from "react";
import logo from "../assets/images/signed-out-top-navbar-logo.png"
import trFlag from "../assets/images/flags/4x3/tr.svg"
import usFlag from "../assets/images/flags/4x3/gb.svg"
import {useHistory} from "react-router-dom";
import i18n from "i18next";

export default function SignedOutNavbar() {

    const [language, setLanguage] = useState(i18n.language);

    const history = useHistory();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang).then(() => setLanguage(lang))
    };

    return (
        <div className="top-navbar-wrapper fixed-top">
            <nav className="top-navbar signed-out-top-navbar p-3">
                <div className="signed-out-top-navbar-left-section">
                    <ul>
                        <li onClick={() => history.push("/")}><img width={500} src={logo} alt="logo"/></li>
                    </ul>
                </div>
                <div className="signed-out-top-navbar-right-section p-3">
                    <ul>
                        {language === "tr" ?
                            <li className="top-navbar-language-selection" onClick={() => changeLanguage("en")}>
                                <img src={trFlag} className="d-inline float-start rounded m-1 me-2" alt="TR Flag"
                                     style={{width: 25}}/>
                                <span>Türkçe</span>
                            </li> :
                            <li className="top-navbar-language-selection" onClick={() => changeLanguage("tr")}>
                                <img src={usFlag} className="d-inline float-start rounded m-1 me-2" alt="USA Flag"
                                     style={{width: 25}}/>
                                <span>English</span>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )

}

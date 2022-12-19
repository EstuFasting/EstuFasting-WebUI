import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../store/actions/userActions";
import {removeToken} from "../localStorage";
import {toast} from "react-toastify";
import logo from "../assets/images/top-navbar-logo.png"
import trFlag from "../assets/images/flags/4x3/tr.svg"
import usFlag from "../assets/images/flags/4x3/gb.svg"
import outIcon from "../assets/images/libraries/fontawesome/solid/right-from-bracket.svg"

export default function Navbar() {

    const [languageFlag, setLanguageFlag] = useState(true);

    const dispatch = useDispatch();
    const user = useSelector(state => state?.user.userProps.user);

    const languageFlagReverse = () => setLanguageFlag(!languageFlag);

    const handleLogOutClick = () => {
        dispatch(signOut());
        removeToken();
        toast.info("Logged Out");
    }

    return (
        <div className="top-navbar-wrapper fixed-top">
            <nav className="top-navbar p-3">
                <div className="top-navbar-left-section">
                    <ul>
                        <li><img width={500} src={logo} alt="logo"/></li>
                    </ul>
                </div>
                <div className="top-navbar-right-section p-3">
                    <ul>
                        {user ?
                            <li>
                                <span>{`${user.firstName} ${user.lastName}`}</span>
                            </li> : null
                        }
                        <div className="vr float-start" style={{height: 35, marginTop: 5, width: 3, borderRadius: 5, opacity: .1}}/>
                        {languageFlag ?
                            <li className="top-navbar-language-selection" style={{width: 110}} onClick={languageFlagReverse}>
                                <img src={trFlag} className="d-inline float-start rounded m-1" alt="TR Flag" style={{width: 25}}/>
                                <span>Türkçe</span>
                            </li>:
                            <li className="top-navbar-language-selection" style={{width: 110}} onClick={languageFlagReverse}>
                                <img src={usFlag} className="d-inline float-start rounded m-1" alt="USA Flag" style={{width: 25}}/>
                                <span>English</span>
                            </li>
                        }
                        <img src={outIcon}></img>
                    </ul>
                </div>
            </nav>
        </div>
    )

}

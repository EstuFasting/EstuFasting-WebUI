import React from 'react';
import {removeToken} from "../localStorage";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";

function SignedInMain(props) {
    const history = useHistory();

    const logout = () => {
        removeToken();
        history.push("/");
        toast("Çıkış yapıldı")
    }

    return (
        <div className="m-5">

            <h1>Hoşgeldiniz !</h1>

            <button onClick={logout}>Çıkış yap</button>

        </div>
    );
}

export default SignedInMain;
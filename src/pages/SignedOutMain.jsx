import React from 'react';
import {Link} from "react-router-dom";

function SignedOutMain(props) {
    return (
        <div className="m-5">
            <Link to="/login"> Giriş yap veya kayıt ol :) </Link>
        </div>
    );
}

export default SignedOutMain;
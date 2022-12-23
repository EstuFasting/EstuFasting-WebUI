import React from 'react';
import {useHistory} from "react-router-dom";

function SignedInMain() {

    const history = useHistory();

    history.push("/calendar");

    return <div/>
}

export default SignedInMain;
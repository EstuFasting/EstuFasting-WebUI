import React from 'react';
import {getToken} from "../localStorage";
import SignedInMain from "./SignedInMain";
import SignedOutMain from "./SignedOutMain";

function Main() {
    return (
        <div>
            {getToken() ? <SignedInMain/> : <SignedOutMain/>}
        </div>
    );
}

export default Main;
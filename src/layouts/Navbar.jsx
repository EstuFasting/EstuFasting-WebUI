import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../store/actions/userActions";
import {removeToken} from "../localStorage";
import {toast} from "react-toastify";

export default function Navbar() {

    const dispatch = useDispatch();

    const user = useSelector(state => state?.user.userProps.user);

    const handleLogOutClick = () => {
        dispatch(signOut());
        removeToken();
        toast.info("Logged Out");
    }

    return (
        <nav>
            <ul>


            </ul>
        </nav>
    )

}

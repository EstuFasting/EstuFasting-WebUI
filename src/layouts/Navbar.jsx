import React from "react";
import {useSelector} from "react-redux";
import SignedInNavbar from "./SignedInNavbar";
import SignedOutNavbar from "./SignedOutNavbar";

export default function Navbar() {

    const user = useSelector(state => state?.user.userProps.user);

    return user ? <SignedInNavbar/> : <SignedOutNavbar/>;

}

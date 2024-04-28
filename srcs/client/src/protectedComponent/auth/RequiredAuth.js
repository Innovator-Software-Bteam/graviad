import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {Component} from "react";

export function RequiredAuth({
                                 component: Component,
                             }) {
    const user = useSelector(state => state.User);
    if (user.profile === null) {
        return (
            <Navigate to={'/login'}/>
        )
    }
    return <Component/>;
}
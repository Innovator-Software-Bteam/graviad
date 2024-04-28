import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {Component} from "react";
export function RequiredDashboard({
                                      component: Component,
                                  }) {
    const user = useSelector(state => state.User);
    if (user.user !== null) {
        return (
            <Navigate to={'/dashboard'}/>
        )
    }
    return <Component/>;
}
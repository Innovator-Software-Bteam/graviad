import React, {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {IProtectedProps} from "./types.d";
import axios from "axios";
import config from "../../../config";


export function ProtectedHomepageRoute({children}: IProtectedProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const loadAuthenticator = () => {
        axios
            .get(`${config.server.url}/auth/login/success`, {withCredentials: true})
            .then((res) => {
                setIsAuthenticated(res.data.status)
            })
            .catch((err) => {
                setIsAuthenticated(false);
            });
    }
    useEffect(() => {
        loadAuthenticator();
    }, []);
    if (isAuthenticated) return <Navigate to={'/dashboard'} state={{from: location}} replace/>
    return <>{children}</>;
}
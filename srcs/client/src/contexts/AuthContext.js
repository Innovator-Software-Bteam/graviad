import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import url from 'url';
import {urlServer} from "../config/graviad.config";
import {useDispatch} from "react-redux";

// Create a new contexts
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const getUser = async () => {
        const profileGoogleURL = url.resolve(urlServer.toString(), '/auth/login/success');
        await axios.get(profileGoogleURL.toString(), { withCredentials: true })
            .then((res) => {
                dispatch(setUser(res.data.user));
                setUser(res.data.user);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getUser().then().catch().finally();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
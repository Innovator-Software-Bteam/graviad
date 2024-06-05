import React, {FC} from 'react';
import {Route} from "react-router-dom";
import {Homepage} from "../../../Homepage";
import {ProtectedHomepageRoute} from "grvd/routers/protection/ProtectedHomepageRoute";

const Login = React.lazy<FC>(() =>
    import('grvd/pages')
        .then(module => ({default: module.LoginPage}
        ))
);
const Home= React.lazy<FC>(() =>
    import('grvd/pages/Homepage/home/Home')
        .then(module => ({default: module.Home}
        ))
);
export const HomepageRouter =
    <Route path={'homepage'} element={
        <ProtectedHomepageRoute>
            <Homepage/>
        </ProtectedHomepageRoute>
    }>
        <Route path={'login'} element={<Login/>}/>
        <Route path={''} element={<Home/>}/>
    </Route>;
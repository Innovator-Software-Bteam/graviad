import React, {FC} from 'react';
import {Navigate, Route} from "react-router-dom";
import {Homepage} from "../../../Homepage";
import {ProtectedHomepageRoute} from "grvd/routers/protection/ProtectedHomepageRoute";

const LoginPage = React.lazy<FC>(() =>
    import('grvd/pages')
        .then(module => ({default: module.LoginPage}
        ))
);
const HomePage= React.lazy<FC>(() =>
    import('grvd/pages/Homepage/home/Home')
        .then(module => ({default: module.Home}
        ))
);
const AboutPage = React.lazy<FC>(() =>
    import('grvd/pages/Homepage/about/AboutPage')
        .then(module => ({default: module.AboutPage}
        ))
);
const ContactPage = React.lazy<FC>(() =>
    import('grvd/pages/Homepage/contact/ContactPage')
        .then(module => ({default: module.ContactPage}
        ))
);
export const HomepageRouter =
    <Route path={'homepage'} element={
        <ProtectedHomepageRoute>
            <Homepage/>
        </ProtectedHomepageRoute>
    }>
        <Route path={''} element={<Navigate to={'home'}/>}/>
        <Route path={'login'} element={<LoginPage/>}/>
        <Route path={'home'} element={<HomePage/>}/>
        <Route path={'about'} element={<AboutPage/>}/>
        <Route path={'contact'} element={<ContactPage/>}/>
    </Route>;
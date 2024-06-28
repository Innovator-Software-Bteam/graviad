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
const PricingPage = React.lazy<FC>(() =>
    import('grvd/pages/Homepage/pricing/PricingPage')
        .then(module => ({default: module.PricingPage}
        ))
);
const PrivacyPage = React.lazy<FC>(() =>
    import('grvd/pages/Homepage/privacy/PrivacyPage')
        .then(module => ({default: module.PrivacyPage}
        ))
);
const NotFoundPage = React.lazy(() =>
    import('grvd/pages/404/NotFoundPage')
        .then(module => ({default: module.NotFoundPage}))
);
const DemoPage = React.lazy(() =>
    import('grvd/pages/Homepage/demo/DemoPage')
        .then(module => ({default: module.DemoPage}))
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
        <Route path={'pricing'} element={<PricingPage/>}/>
        <Route path={'privacy'} element={<PrivacyPage/>}/>
        <Route path={'demo'} element={<DemoPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
    </Route>;
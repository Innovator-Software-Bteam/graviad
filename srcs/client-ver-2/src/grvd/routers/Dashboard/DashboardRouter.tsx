import React from "react";
import {Navigate, Route} from "react-router-dom";
import {Dashboard} from "../../../Dashboard";


const DashboardHome = React.lazy(() =>
    import('grvd/pages/Dashboard/DashboardHome')
        .then(module => ({default: module.DashboardHome})
        ));
const Profile = React.lazy(() =>
    import('grvd/pages/Dashboard/Profile')
        .then(module => ({default: module.Profile})
        ));
const Product = React.lazy(() =>
    import('grvd/pages/Dashboard/Product')
        .then(module => ({default: module.Product})
        ));

export const DashboardRouter =
    <Route path={'dashboard'} element={<Dashboard/>}>\
        <Route path={''} element={<Navigate to={'home'}/>}/>
        <Route path={'home'} element={<DashboardHome/>}/>
        <Route path={'profile'} element={<Profile/>}/>
        <Route path={'products/:id'} element={<Product/>}/>
    </Route>
;
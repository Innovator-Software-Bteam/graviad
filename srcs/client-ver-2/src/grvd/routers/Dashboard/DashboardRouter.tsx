import React from "react";
import {Navigate, Route} from "react-router-dom";
import {Dashboard} from "../../../Dashboard";


const DashboardHome = React.lazy(() =>
    import('grvd/pages/Dashboard/home/DashboardHomePage')
        .then(module => ({default: module.DashboardHomePage})
        ));
const Profile = React.lazy(() =>
    import('grvd/pages/Dashboard/profile/ProfilePage')
        .then(module => ({default: module.ProfilePage})
        ));
const Product = React.lazy(() =>
    import('grvd/pages/Dashboard/product/ProductPage')
        .then(module => ({default: module.ProductPage})
        ));

export const DashboardRouter =
    <Route path={'dashboard'} element={<Dashboard/>}>\
        <Route path={''} element={<Navigate to={'home'}/>}/>
        <Route path={'home'} element={<DashboardHome/>}/>
        <Route path={'profile/:id'} element={<Profile/>}/>
        <Route path={'products/:id'} element={<Product/>}/>
    </Route>
;
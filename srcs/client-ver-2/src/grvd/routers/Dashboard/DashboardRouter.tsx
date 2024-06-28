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

const AccountPage = React.lazy(() =>
    import('grvd/pages/Dashboard/account/AccountPage')
        .then(module => ({default: module.AccountPage})
        ));

const AccountProduct = React.lazy(() =>
    import('grvd/pages/Dashboard/account/AccountProductPage')
        .then(module => ({default: module.AccountProductPage})
        ));
const MenuPage = React.lazy(() =>
    import('grvd/pages/Dashboard/menu/MenuPage')
        .then(module => ({default: module.MenuPage})
        ));

const MenuTemplatePage = React.lazy(() =>
    import('grvd/pages/Dashboard/menu/MenuTemplatePage')
        .then(module => ({default: module.MenuTemplatePage})
        ));
const NotFoundPage = React.lazy(() =>
    import('grvd/pages/404/NotFoundPage')
        .then(module => ({default: module.NotFoundPage}))
);
export const DashboardRouter =
    <Route path={'dashboard'} element={<Dashboard/>}>
        <Route path={''} element={<Navigate to={'home'}/>}/>
        <Route path={'home'} element={<DashboardHome/>}/>
        <Route path={'account'} element={<AccountPage/>}>
            <Route path={'products'} element={<AccountProduct/>}/>
        </Route>
        <Route path={'products'} element={<Navigate to={'/dashboard/home'}/>}/>
        <Route path={'profile'} element={<Navigate to={'/dashboard/home'}/>}/>
        <Route path={'templates'} element={<MenuTemplatePage/>}/>
        <Route path={'profile/:id'} element={<Profile/>}/>
        <Route path={'products/:id'} element={<Product/>}/>
        <Route path={'*'} element={<NotFoundPage/>}/>
    </Route>
;
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, Routes} from "react-router-dom";
import {HomepageRouter} from "./Homepage/HomepageRouter";
import {DashboardRouter} from "./Dashboard/DashboardRouter";
import React from "react";
import App from "../../App";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App/>}>
            <Route path="/" element={<Navigate to="/homepage"/>}/>
            {HomepageRouter}
            {DashboardRouter}
        </Route>
    )
);
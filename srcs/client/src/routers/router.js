import {createBrowserRouter, createRoutesFromElements, Outlet, Route, Routes} from "react-router-dom";
import {AppRouter} from "./AppRouter";
import {DashboardRouter} from "./DashboardRouter";

export const routers = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                {AppRouter}
                {DashboardRouter}
            </Route>
        )
    )
;
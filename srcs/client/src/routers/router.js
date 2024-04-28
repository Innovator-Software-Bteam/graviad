import {createBrowserRouter, createRoutesFromElements, Outlet, Route, Routes} from "react-router-dom";
import {AppRouter} from "./AppRouter";
import {DashboardRouter} from "./DashboardRouter";
import {RequiredAuth} from "../protectedComponent/auth/RequiredAuth";

export const routers = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                {AppRouter}
                {DashboardRouter}
            </Route>
        )
    )
;
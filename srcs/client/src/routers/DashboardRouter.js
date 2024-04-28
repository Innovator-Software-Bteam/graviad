import Dashboard from "../Dashboard";
import {Route} from "react-router-dom";
import {RequiredAuth} from "../protectedComponent/auth/RequiredAuth";

export const DashboardRouter =
    <Route path={'dashboard'} element={
        <RequiredAuth component={Dashboard}/>
    }>
    </Route>
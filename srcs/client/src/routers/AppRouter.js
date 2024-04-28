import {Route} from "react-router-dom";
import {lazy} from "react";
import App from "../App";
import {RequiredDashboard} from "../protectedComponent/auth/RequiredDashboard";

const Login = lazy(() => import('../components/pages/Auth').then(module => ({default: module.Login})));
const Home = lazy(() => import('../components/pages/App/Home').then(module => ({default: module.Home})));

export const AppRouter =
    <Route path={''} element={<RequiredDashboard component={App}/>}>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={<Login/>}/>
    </Route>

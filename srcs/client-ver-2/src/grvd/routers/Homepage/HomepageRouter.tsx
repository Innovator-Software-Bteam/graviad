import React, {FC} from 'react';
import {Route} from "react-router-dom";
import {Homepage} from "../../../Homepage";

const Login = React.lazy<FC>(() =>
    import('grvd/pages')
        .then(module => ({default: module.Login}
        ))
);
const Home= React.lazy<FC>(() =>
    import('grvd/pages/Homepage/Home')
        .then(module => ({default: module.Home}
        ))
);
export const HomepageRouter =
    <Route path={'homepage'} element={<Homepage/>}>
        <Route path={'login'} element={<Login/>}/>
        <Route path={'home'} element={<Home/>}/>
    </Route>;
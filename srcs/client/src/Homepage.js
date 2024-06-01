import './App.css';
import {Header} from "./components/organisms/Homepage/Header";
import {Main} from "./components/organisms/Homepage/Main";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {urlServer} from "./config/graviad.config";
import axios from "axios";
import url from 'url'
import {setUser} from "./redux/counters/User";

export function Homepage() {
    return (
        <div className="Homepage">
            <Header/>
            <Main>
                <Outlet/>
            </Main>
        </div>
    );
}


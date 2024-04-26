import './App.css';
import {Header} from "./components/organisms/Header";
import {Main} from "./components/organisms/Main";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {urlServer} from "./config/graviad.config";
import axios from "axios";
import url from 'url'
import {setUser} from "./redux/counters/User";

function App() {
    const dispatch = useDispatch();
    const getUser = async () => {
        const profileGoogleURL = url.resolve(urlServer.toString(), '/auth/login/success');
        await axios.get(profileGoogleURL.toString(), {withCredentials: true})
            .then((res) => {
                console.log(res.data.user);
                dispatch(setUser(res.data.user));
            })
            .catch((err) => {
                console.error(err);
            });
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className="App">
            <Header/>
            <Main>
                <Outlet/>
            </Main>
        </div>
    );
}

export default App;

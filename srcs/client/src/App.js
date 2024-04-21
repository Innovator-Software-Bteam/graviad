import logo from './logo.svg';
import './App.css';
import {Header} from "./components/organisms/Header";
import {useEffect, useRef, useState} from "react";
import {Main} from "./components/organisms/Main";

function App() {
    return (
        <div className="App">
            <Header
            />
            <Main
            >
            </Main>
        </div>
    );
}

export default App;

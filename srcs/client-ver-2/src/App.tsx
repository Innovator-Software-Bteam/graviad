import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import {DialogProvider} from "grvd/organisms/Dialog";
import {MediaProvider} from "grvd/reponsive";

function App() {
    return (
        <DialogProvider>
            <MediaProvider>
                <div className="App">
                    <Outlet/>
                </div>
            </MediaProvider>
        </DialogProvider>
    );
}

export default App;

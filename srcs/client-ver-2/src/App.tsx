import React from 'react';
import './App.css';
import {Outlet} from "react-router-dom";
import {DialogProvider} from "grvd/organisms/Dialog";

function App() {
    return (
        <DialogProvider>
            <div className="App">
                <Outlet/>
            </div>
        </DialogProvider>
    );
}

export default App;

import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "grvd/storage";
import {RouterProvider} from "react-router-dom";
import {router} from "grvd/routers";
import {ThemeProvider} from "@material-tailwind/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider>
            <Provider store={store}>
                <Suspense fallback={<div>Loading...</div>}>
                    <RouterProvider router={router}/>
                </Suspense>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

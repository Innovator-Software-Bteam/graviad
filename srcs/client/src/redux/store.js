import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./counters/User";

export default configureStore({
    reducer: {
        User: userReducer,
    }
});

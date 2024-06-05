import {configureStore} from "@reduxjs/toolkit";
import {userCounterSlice} from "./counters/UserCounter";

export const store = configureStore({
    reducer: {
        state: userCounterSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
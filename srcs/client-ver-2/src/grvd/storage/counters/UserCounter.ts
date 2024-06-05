import {createSlice, PayloadAction} from "@reduxjs/toolkit";
interface UserState {
    isAuthenticated: boolean;
}

type Role = "user" | "guess";


export interface UserCounterState {
    state: UserState;
    role: Role;
}

enum RootStorageState {
    LOCAL_STORAGE = 'localStorage',
    REDUX = 'redux',
}
// const initialUserState: UserCounterState = getInitialState(RootStorageState.LOCAL_STORAGE) || getInitialState(RootStorageState.REDUX);
const initialUserState: UserCounterState = {
    state: {
        isAuthenticated: false
    },
    role: 'guess'
}
export const userCounterSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setRoles: (state: UserCounterState, action: PayloadAction<{ role: Role, data: any }>) => {
            state.role = action.payload.role;
        },
        setIsAuthenticated: (state: UserCounterState, action: PayloadAction<boolean>) => {
            state.state.isAuthenticated = action.payload;
        }
    }
});
export const {setRoles, setIsAuthenticated} = userCounterSlice.actions;
export default userCounterSlice.reducer;
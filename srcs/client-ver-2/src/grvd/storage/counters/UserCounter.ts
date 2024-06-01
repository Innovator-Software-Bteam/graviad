import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TProfile} from "grvd";
interface UserState {
    isAuthenticated: boolean;
}

export interface CustomerState {
    description?: string;
    slogan?: string;
    email?: string;
    phone?: string;
    address?: string;
    socialLinks?: any [];
    numberOfLikes?: number;
    numberOfProducts?: number;
}

type Role = "user" | "customer" | "enterprise";


export interface UserCounterState {
    profile?: TProfile;
    state: UserState;
    roles: Role [];
    customer?: CustomerState;
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
    roles: ['user', 'customer']
}
export const userCounterSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setProfile: (state: UserCounterState, action: PayloadAction<TProfile>) => {
            const {emails, id, displayName, photos, name, provider} = action.payload;
            state.profile = {
                id,
                displayName,
                photos,
                name,
                emails,
                provider
            };
        },
        setRoles: (state: UserCounterState, action: PayloadAction<{ role: Role, data: any }>) => {

        },
    }
});
export const {setProfile, setRoles} = userCounterSlice.actions;
export default userCounterSlice.reducer;
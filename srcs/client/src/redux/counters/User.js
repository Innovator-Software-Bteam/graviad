import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        profile: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.profile = action.payload;
        },
        removeUser: (state) => {
            state.profile = null;
        },
    },
});
export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;
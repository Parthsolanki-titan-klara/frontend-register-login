import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.email = action.payload.email;
        },
        clearTokens: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.email = null;
        },
    },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
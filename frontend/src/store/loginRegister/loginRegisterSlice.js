import { createSlice } from '@reduxjs/toolkit';

const loginRegisterSlice = createSlice({
    name: 'login-register',
    initialState: {
        isLoginForm: false,
    },
    reducers: {
        toggleLoginForm: (state, action) => {
            state.isLoginForm = action.payload;
        },
        showLoginForm: (state) => {
            state.isLoginForm = true;
        },
        showRegisterForm: (state) => {
            state.isLoginForm = false;
        },
    },
});

export const { toggleLoginForm, showLoginForm, showRegisterForm } = loginRegisterSlice.actions;
export default loginRegisterSlice.reducer;

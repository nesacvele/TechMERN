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
    },
});

export const { toggleLoginForm } = loginRegisterSlice.actions;
export default loginRegisterSlice.reducer;

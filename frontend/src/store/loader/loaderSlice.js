import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        showLoader: false,
    },
    reducers: {
        showLoader: (state, action) => {
            state.showLoader = action.payload;
        },
    },
});

export const { showLoader } = loaderSlice.actions;
export default loaderSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const getSymbol = () => {
    if (localStorage.currency === 'EUR') return '€';
    if (localStorage.currency === 'USD') return '$';
    if (localStorage.currency === 'RSD') return 'дин';
    return '€';
};

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currency: localStorage.currency ? localStorage.currency : 'EUR',
        symbol: getSymbol(),
    },
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
            if (state.currency === 'EUR') state.symbol = '€';
            if (state.currency === 'USD') state.symbol = '$';
            if (state.currency === 'RSD') state.symbol = 'дин';
        },
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;

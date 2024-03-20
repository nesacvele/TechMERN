import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currency/currencySlice';
import loginRegisterSlice from './loginRegister/loginRegisterSlice';

export default configureStore({
    reducer: {
        currencyStore: currencySlice,
        loginRegisterStore: loginRegisterSlice,
    },
});

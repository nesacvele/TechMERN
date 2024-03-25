import { configureStore } from '@reduxjs/toolkit';
import currencySlice from './currency/currencySlice';
import loginRegisterSlice from './loginRegister/loginRegisterSlice';
import loaderSlice from './loader/loaderSlice';

export default configureStore({
    reducer: {
        currencyStore: currencySlice,
        loginRegisterStore: loginRegisterSlice,
        loaderStore: loaderSlice,
    },
});

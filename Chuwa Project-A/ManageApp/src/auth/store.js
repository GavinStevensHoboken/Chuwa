import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
 
export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    },
},composeWithDevTools());

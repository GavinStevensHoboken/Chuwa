import { createStore, combineReducers } from 'redux';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer
});

export const store = createStore(rootReducer);
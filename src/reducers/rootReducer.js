import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart/index';


const rootReducer = combineReducers({
    cartReducer: cartReducer
});

export default rootReducer;
/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import { productsReducer } from './productReducer';
import { cardReducer } from './cardReducer'
export default combineReducers({
   simpleReducer,
   productsReducer,
   cardReducer
});
/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import { productsReducer } from './productReducer';

export default combineReducers({
   simpleReducer,
   productsReducer
});
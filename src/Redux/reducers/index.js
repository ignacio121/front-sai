import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navReducer from './navReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer
  // otros reducers pueden ir aquí
});

export default rootReducer;

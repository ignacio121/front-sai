import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // otros reducers pueden ir aquí
});

export default rootReducer;

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navReducer from './navReducer';
import incidenciasReducer from './incidenciasReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
  incidencias: incidenciasReducer
  // otros reducers pueden ir aquí
});

export default rootReducer;

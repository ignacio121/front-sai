import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoriasReducer from './categoriasReducer';
import destinatariosReducer from './destinatariosReducer';
import incidenciasReducer from './incidenciasReducer';
import navReducer from './navReducer';



const rootReducer = combineReducers({
  auth: authReducer,
  categorias : categoriasReducer,
  destinatarios : destinatariosReducer,
  nav: navReducer,
  incidencias: incidenciasReducer
  // otros reducers pueden ir aquí
});

export default rootReducer;

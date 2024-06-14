import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoriasReducer from './categoriasReducer';
import destinatariosReducer from './destinatariosReducer';
import incidenciasReducer from './incidenciasReducer';
import navReducer from './navReducer';
import preguntasFrecuentesReducer from './preguntasFrecuentesReducer';





const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
  incidencias: incidenciasReducer,
  categorias : categoriasReducer,
  destinatarios : destinatariosReducer,
  preguntasFrecuentes :preguntasFrecuentesReducer
});

export default rootReducer;

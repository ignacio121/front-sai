import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoriasReducer from './categoriasReducer';
import destinatariosReducer from './destinatariosReducer';
import incidenciasReducer from './incidenciasReducer';
import navReducer from './navReducer';
import preguntasFrecuentesReducer from './preguntasFrecuentesReducer';
import EstudianteReducer from './estudiantesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
  incidencias: incidenciasReducer,
  categorias : categoriasReducer,
  destinatarios : destinatariosReducer,
  preguntasFrecuentes :preguntasFrecuentesReducer,
  estudiantes: EstudianteReducer
});

export default rootReducer;

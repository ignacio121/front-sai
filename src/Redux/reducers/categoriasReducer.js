// reducers/categoriasReducer.js

import { CATEGORIAS_REQUEST, CATEGORIAS_SUCCESS, CATEGORIAS_FAILURE } from '../actions/authActions';

const initialState = {
  loading: false,
  categorias: [], // Inicializamos categorías como un arreglo vacío
  error: null
};

const categoriasReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CATEGORIAS_SUCCESS:
      return {
        ...state,
        loading: false,
        categorias: action.payload, // Actualizamos categorías con los datos recibidos
        error: null
      };
    case CATEGORIAS_FAILURE:
      return {
        ...state,
        loading: false,
        categorias: [], // Reiniciamos categorías en caso de error
        error: action.error
      };
    default:
      return state;
  }
};

export default categoriasReducer;

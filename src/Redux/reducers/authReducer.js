// En reducers/authReducer.js

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CATEGORIAS_REQUEST,
  CATEGORIAS_SUCCESS,
  CATEGORIAS_FAILURE
} from '../actions/authActions';

const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  sesion: null,
  user: null,
  token: localStorage.getItem('token') || null,
  error: null,
  categorias: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case CATEGORIAS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        sesion: action.payload.sesion,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        sesion: null,
        categorias: [] // Limpiar categorías al cerrar sesión
      };
    case CATEGORIAS_SUCCESS:
      return {
        ...state,
        loading: false,
        categorias: action.payload
      };
    case CATEGORIAS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default authReducer;

import {
  DESTINATARIOS_REQUEST,
  DESTINATARIOS_SUCCESS,
  DESTINATARIOS_FAILURE
} from '../actions/destinatarioActions';

const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  sesion: null,
  user: null,
  token: localStorage.getItem('token') || null,
  error: null,
  destinatarios: []
};

const destinatariosReducer = (state = initialState, action) => {
  switch (action.type) {
      case DESTINATARIOS_REQUEST:
          return {
              ...state,
              loading: true,
              error: null
          };

      case DESTINATARIOS_SUCCESS:
          return {
              ...state,
              loading: false,
              destinatarios: action.payload
          };

      case DESTINATARIOS_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.error
          };

      default:
          return state;
  }
};

export default destinatariosReducer;

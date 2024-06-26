import {
    INCIDENCIAS_REQUEST,
    INCIDENCIAS_SUCCESS,
    INCIDENCIAS_FAILURE,
    INCIDENCIAS_REPLY_REQUEST,
    INCIDENCIAS_REPLY_SUCCESS,
    INCIDENCIAS_REPLY_FAILURE,
    INCIDENCIAS_CONFIRM_REQUEST,
    INCIDENCIAS_CONFIRM_SUCCESS,
    INCIDENCIAS_CONFIRM_FAILURE
  } from '../actions/incidenciasActions';
  
  const initialState = {
    loading: false,
    incidencias: null,
    reuniones: null,
    error: null,
  };
  
  const incidenciasReducer = (state = initialState, action) => {
    switch (action.type) {
      case INCIDENCIAS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case INCIDENCIAS_SUCCESS:
        return {
          ...state,
          loading: false,
          incidencias: action.payload.Data,
          reuniones: action.payload.reuniones,
          error: null
        };
      case INCIDENCIAS_FAILURE:
        return {
          ...state,
          loading: false,
          incidencias: null,
          error: action.error
        };
      case INCIDENCIAS_REPLY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case INCIDENCIAS_REPLY_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
      case INCIDENCIAS_REPLY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      case INCIDENCIAS_CONFIRM_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case INCIDENCIAS_CONFIRM_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
      case INCIDENCIAS_CONFIRM_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default incidenciasReducer;

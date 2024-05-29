import {
    INCIDENCIAS_REQUEST,
    INCIDENCIAS_SUCCESS,
    INCIDENCIAS_FAILURE
  } from '../actions/incidenciasActions';
  
  const initialState = {
    loading: false,
    incidencias: null,
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
          incidencias: action.payload,
          error: null
        };
      case INCIDENCIAS_FAILURE:
        return {
          ...state,
          loading: false,
          incidencias: null,
          error: action.error
        };
      default:
        return state;
    }
  };
  
  export default incidenciasReducer;

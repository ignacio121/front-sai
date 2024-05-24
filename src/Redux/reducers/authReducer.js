// src/reducers/authReducer.js
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
  } from '../actions/authActions';
  
  const initialState = {
    loading: false,
    isAuthenticated: !!localStorage.getItem('token'),
    sesion: null,
    user: null,
    token:  localStorage.getItem('token') || null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          sesion: action.payload.sesion,
          user: action.payload.user,
          token: action.payload.token,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          token: null,
          error: action.error,
        };
      case LOGOUT:
        return { ...state, token: null, user: null, isAuthenticated: false, sesion: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
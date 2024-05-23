// src/reducers/authReducer.js
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
  } from '../actions/authActions';
  
  const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    token: null,
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
          user: action.payload,
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
        return { ...state, token: null, user: null, isAuthenticated: false };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
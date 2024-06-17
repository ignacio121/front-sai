import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actions/authActions';

const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  sesion: JSON.parse(localStorage.getItem('sesion')) || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: null, 
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
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
        sesion: null,
        user: null,
        token: null,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sesion: null,
        user: null,
        token: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
import {

 CATEGORIAS_REQUEST,
  CATEGORIAS_SUCCESS,
  CATEGORIAS_FAILURE
} from '../actions/categoriaActions';




const initialState = {
  loading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  sesion: null,
  user: null,
  token: localStorage.getItem('token') || null,
  error: null,
  categorias: []
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

export default categoriasReducer;

import {
  CATEGORIAS_REQUEST,
  CATEGORIAS_SUCCESS,
  CATEGORIAS_FAILURE
} from '../actions/categoriaActions';


const initialState = {
  loading: false,
  token: localStorage.getItem('token') || null,
  error: null,
  categoriasPadre: [],
  categoriasHijo: []
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
        categoriasPadre: action.payload.categoriasPadre,
        categoriasHijo: action.payload.categoriasHijo
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

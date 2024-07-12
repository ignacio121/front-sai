import { 
  FORO_REQUEST, 
  FORO_SUCCESS, 
  FORO_FAILURE,
  FORO_RESPUESTAS_REQUEST,
  FORO_RESPUESTAS_SUCCESS,
  CREATE_FORO_SUCCESS,
  UPDATE_FORO_SUCCESS,
  DELETE_FORO_SUCCESS
} from '../actions/ForoActions';

const initialState = {
  loading: false,
  loadingRespuestas: false,
  data: [],
  dataRespuestas: [],
  error: null
};

const foroReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FORO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case FORO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case FORO_RESPUESTAS_REQUEST:
      return {
        ...state,
        loadingRespuestas: true,
        error: null
      };
    case FORO_RESPUESTAS_SUCCESS:
      return {
        ...state,
        loadingRespuestas: false,
        dataRespuestas: action.payload,
        error: null
      };
    case CREATE_FORO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        error: null
      };
    case UPDATE_FORO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map(pregunta =>
          pregunta.id === action.payload.id ? action.payload : pregunta
        ),
        error: null
      };
    case DELETE_FORO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter(pregunta => pregunta.id !== action.payload.id),
        error: null
      };
    default:
      return state;
  }
};

export default foroReducer;

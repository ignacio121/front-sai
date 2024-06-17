import { 
  PREGUNTAS_FRECUENTES_REQUEST, 
  PREGUNTAS_FRECUENTES_SUCCESS, 
  PREGUNTAS_FRECUENTES_FAILURE,
  CREATE_PREGUNTA_FRECUENTE_SUCCESS,
  UPDATE_PREGUNTA_FRECUENTE_SUCCESS,
  DELETE_PREGUNTA_FRECUENTE_SUCCESS
} from '../actions/pfActions';

const initialState = {
  loading: false,
  data: [],
  error: null
};

const preguntasFrecuentesReducer = (state = initialState, action) => {
  switch (action.type) {
    case PREGUNTAS_FRECUENTES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case PREGUNTAS_FRECUENTES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    case PREGUNTAS_FRECUENTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case CREATE_PREGUNTA_FRECUENTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        error: null
      };
    case UPDATE_PREGUNTA_FRECUENTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.map(pregunta =>
          pregunta.id === action.payload.id ? action.payload : pregunta
        ),
        error: null
      };
    case DELETE_PREGUNTA_FRECUENTE_SUCCESS:
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

export default preguntasFrecuentesReducer;

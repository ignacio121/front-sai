import { PREGUNTAS_FRECUENTES_REQUEST, PREGUNTAS_FRECUENTES_SUCCESS, PREGUNTAS_FRECUENTES_FAILURE } from '../actions/pfActions';

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
    default:
      return state;
  }
};

export default preguntasFrecuentesReducer;

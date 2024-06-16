import {
  ESTUDIANTES_REQUEST,
  ESTUDIANTES_SUCCESS,
  ESTUDIANTES_ID_SUCCESS,
  ESTUDIANTES_FAILURE
} from '../actions/estudiantesActions';

const initialState = {
  loading: false,
  error: null,
  estudiante: null,
  estudiantes:[]
};

const EstudianteReducer = (state = initialState, action) => {
  switch (action.type) {
      case ESTUDIANTES_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
              estudiante: null
          };

      case ESTUDIANTES_SUCCESS:
          return {
              ...state,
              loading: false,
              estudiantes: action.payload
          };
      case ESTUDIANTES_ID_SUCCESS:
          return {
              ...state,
              loading: false,
              estudiante: action.payload
          };      
      case ESTUDIANTES_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.error
          };

      default:
          return state;
  }
};

export default EstudianteReducer;

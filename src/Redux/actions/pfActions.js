import axios from 'axios';
import { URI } from '../config';

export const PREGUNTAS_FRECUENTES_REQUEST = 'PREGUNTAS_FRECUENTES_REQUEST';
export const PREGUNTAS_FRECUENTES_SUCCESS = 'PREGUNTAS_FRECUENTES_SUCCESS';
export const PREGUNTAS_FRECUENTES_FAILURE = 'PREGUNTAS_FRECUENTES_FAILURE';

export const fetchPreguntasFrecuentes = () => async (dispatch, getState) => {
  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = getState().auth.token; 

    const response = await axios.get(`${URI}/api/faq`, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    });

    console.log('Preguntas Frecuentesss:', response.data);
    dispatch({
      type: PREGUNTAS_FRECUENTES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching preguntas frecuentes:', error);
    dispatch({
      type: PREGUNTAS_FRECUENTES_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

import axios from 'axios';
import { URI } from '../config';

export const INCIDENCIAS_REQUEST = 'INCIDENCIAS_REQUEST';
export const INCIDENCIAS_SUCCESS = 'INCIDENCIAS_SUCCESS';
export const INCIDENCIAS_FAILURE = 'INCIDENCIAS_FAILURE';

export const getIncidenciasPersonal = (personal, token) => async (dispatch) => {
  dispatch({ type: INCIDENCIAS_REQUEST });
  
  try {
    const { data: incidenciaPersonalResponse } = await axios.get(`${URI}/api/incidencia/porPersonal/${personal}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: INCIDENCIAS_SUCCESS, payload: incidenciaPersonalResponse });

  } catch (error) {
    dispatch({
      type: INCIDENCIAS_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};
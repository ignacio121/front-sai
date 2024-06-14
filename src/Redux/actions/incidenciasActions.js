import axios from 'axios';
import { URI } from '../config';

export const INCIDENCIAS_REQUEST = 'INCIDENCIAS_REQUEST';
export const INCIDENCIAS_SUCCESS = 'INCIDENCIAS_SUCCESS';
export const INCIDENCIAS_FAILURE = 'INCIDENCIAS_FAILURE';

export const POST_INCIDENCIA_REQUEST = 'POST_INCIDENCIA_REQUEST';
export const POST_INCIDENCIA_SUCCESS = 'POST_INCIDENCIA_SUCCESS';
export const POST_INCIDENCIA_FAILURE = 'POST_INCIDENCIA_FAILURE';

export const getIncidenciasPersonal = (personal, token) => async (dispatch) => {
  dispatch({ type: INCIDENCIAS_REQUEST });

  try {
    const { data: incidenciaPersonalResponse } = await axios.get(`${URI}/api/incidencia/porPersonal/${personal}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const modifiedData = incidenciaPersonalResponse.map(incidencia => {
      let estado = "pendiente";
      if (incidencia.respuestaincidencia && incidencia.respuestaincidencia.length > 0) {
        estado = "atendida"; // por ejemplo, cambia el estado si hay respuestas
      } if (incidencia.estado === "cerrada") {
        estado = "rechazada"
      } if (incidencia.reabierta) {
        estado = "Aceptada"
      } 
  
      return {
        ...incidencia,
        estado: estado
      };
    });

    dispatch({ type: INCIDENCIAS_SUCCESS, payload: modifiedData });

  } catch (error) {
    dispatch({
      type: INCIDENCIAS_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

export const postIncidencia = (incidenciaData) => async (dispatch, getState) => {
  dispatch({ type: POST_INCIDENCIA_REQUEST });

  try {
    const token = getState().auth.token;
    const formData = new FormData();

    for (const key in incidenciaData) {
      if (key === 'archivo') {
        incidenciaData[key].forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, incidenciaData[key]);
      }
    }

    const response = await axios.post(`${URI}/api/incidencia`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: POST_INCIDENCIA_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: POST_INCIDENCIA_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

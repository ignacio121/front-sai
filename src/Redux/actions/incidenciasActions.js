import axios from 'axios';
import { URI } from '../config';
import { getCategorias } from './categoriaActions';

export const INCIDENCIAS_REQUEST = 'INCIDENCIAS_REQUEST';
export const INCIDENCIAS_SUCCESS = 'INCIDENCIAS_SUCCESS';
export const INCIDENCIAS_FAILURE = 'INCIDENCIAS_FAILURE';

export const POST_INCIDENCIA_REQUEST = 'POST_INCIDENCIA_REQUEST';
export const POST_INCIDENCIA_SUCCESS = 'POST_INCIDENCIA_SUCCESS';
export const POST_INCIDENCIA_FAILURE = 'POST_INCIDENCIA_FAILURE';

export const INCIDENCIAS_REPLY_REQUEST = 'INCIDENCIAS_REPLY_REQUEST';
export const INCIDENCIAS_REPLY_SUCCESS = 'INCIDENCIAS_REPLY_SUCCESS';
export const INCIDENCIAS_REPLY_FAILURE = 'INCIDENCIAS_REPLY_FAILURE';

export const INCIDENCIAS_CONFIRM_REQUEST = 'INCIDENCIAS_CONFIRM_REQUEST';
export const INCIDENCIAS_CONFIRM_SUCCESS = 'INCIDENCIAS_CONFIRM_SUCCESS';
export const INCIDENCIAS_CONFIRM_FAILURE = 'INCIDENCIAS_CONFIRM_FAILURE';

export const getIncidencias = (id, personal_type, token) => async (dispatch, getState) => {
  await dispatch(getCategorias());

  dispatch({ type: INCIDENCIAS_REQUEST });

  try {
    const { categoriasHijo, categoriasPadre } = getState().categorias;

    let incidenciaResponse;

    if (personal_type === 'personal') {
      const { data } = await axios.get(`${URI}/api/incidencia/porPersonal/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      incidenciaResponse = data;
    } else if (personal_type === 'alumno') {
      const { data } = await axios.get(`${URI}/api/incidencia/porAlumno/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      incidenciaResponse = data;
    } else {
      throw new Error('Tipo de personal no válido');
    }

    const getCategoriaNombre = (categoriaId) => {
      const categoria = categoriasHijo.find(cat => cat.id === categoriaId) || categoriasPadre.find(cat => cat.id === categoriaId);
      return categoria ? categoria.nombre : 'Desconocida';
    };

    const modifiedData = incidenciaResponse.map(incidencia => {
      let estado = "Pendiente";
      if (incidencia.respuestaincidencia && incidencia.respuestaincidencia.length > 0) {
        estado = "Atendida";
      }
      if (incidencia.estado === "cerrada") {
        estado = "Rechazada";
      }
      if (incidencia.reabierta) {
        estado = "Aceptada";
      }

      return {
        ...incidencia,
        estado: estado,
        categoriaNombre: getCategoriaNombre(incidencia.categoriaincidencia_id)
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

export const replyIncidencia = (incidencia_id, contenido, remitente_id, remitente_tipo) => async (dispatch, getState) => {
  dispatch({ type: INCIDENCIAS_REPLY_REQUEST });
  try {
      const token = getState().auth.token;
      console.log( incidencia_id, contenido, remitente_id, remitente_tipo )
      await axios.post(`${URI}/api/incidencia/responder`, { incidencia_id, contenido, remitente_id, remitente_tipo },{
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      
      dispatch({ type: INCIDENCIAS_REPLY_SUCCESS});
      
  } catch (error) {
      console.error('Error respondiendo mensajes:', error);
      dispatch({
          type: INCIDENCIAS_REPLY_FAILURE,
          error: error.response ? error.response.data : {
              message: error.message
          }
      });
  }
};

export const confirmReplyIncidencia = (incidencia_id) => async (dispatch, getState) => {
  dispatch({ type: INCIDENCIAS_CONFIRM_REQUEST });
  try {
    const token = getState().auth.token;


    const response = await axios.put(`${URI}/api/incidencia/reabrir/${incidencia_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data)

    dispatch({ type: INCIDENCIAS_CONFIRM_SUCCESS , payload: response.data });
  } catch (error) {
    console.error('Error al confirmar respuesta de la incidencia:', error);
    dispatch({
      type: INCIDENCIAS_CONFIRM_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

export const rejectIncidencia = (incidencia_id) => async (dispatch, getState) => {
  dispatch({ type: INCIDENCIAS_CONFIRM_REQUEST });
  try {
    const token = getState().auth.token;


    const response = await axios.put(`${URI}/api/incidencia/cerrar/${incidencia_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(response.data)

    dispatch({ type: INCIDENCIAS_CONFIRM_SUCCESS , payload: response.data });
  } catch (error) {
    console.error('Error al rechazar respuesta de la incidencia:', error);
    dispatch({
      type: INCIDENCIAS_CONFIRM_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};
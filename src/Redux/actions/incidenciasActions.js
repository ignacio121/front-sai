import axios from 'axios';
import { URI } from '../config';
import { getCategorias } from './categoriaActions';
import { handleError, isTokenExpired } from './errorActions';
import { useNavigate } from 'react-router-dom';
import { logout } from './authActions';

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

export const REUNION_POST = 'REUNION_POST';
export const REUNION_SUCCESS = 'REUNION_SUCCESS';
export const REUNION_FAILURE = 'REUNION_FAILURE';

export const getIncidencias = (id, personal_type, navigate) => async (dispatch, getState) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  await dispatch(getCategorias());
  dispatch({ type: INCIDENCIAS_REQUEST });
  
  try {
    const { categoriasHijo, categoriasPadre } = getState().categorias;
    const token = localStorage.getItem('token');
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

    let reuniones = [];

    const modifiedData = incidenciaResponse.map(incidencia => {
      let estado = "Pendiente";

      const tieneRespuestaDePersonal = incidencia.respuestaincidencia.some(
        respuesta => respuesta.remitente_tipo === 'personal'
      );

      if (tieneRespuestaDePersonal) {
        estado = "Atendida";
      }
      if (incidencia.estado === "cerrada") {
        estado = "Rechazada";
      }
      if (incidencia.reabierta) {
        estado = "Aceptada";
      }

      reuniones = [...reuniones, ...incidencia.reunion];

      return {
        ...incidencia,
        estado: estado,
        categoriaNombre: getCategoriaNombre(incidencia.categoriaincidencia_id)
      };
    });

    const estadoPrioridad = {
      "Pendiente": 1,
      "Atendida": 2,
      "Aceptada": 3,
      "Rechazada": 4
    };

    const prioridadValor = {
      "Alta": 1,
      "Media": 2,
      "Baja": 3
    };

    const Data = modifiedData.sort((a, b) => {
      // Primero, ordenar por estado
      if (estadoPrioridad[a.estado] !== estadoPrioridad[b.estado]) {
        return estadoPrioridad[a.estado] - estadoPrioridad[b.estado];
      }
      // Luego, ordenar por prioridad
      if (prioridadValor[a.prioridad] !== prioridadValor[b.prioridad]) {
        return prioridadValor[a.prioridad] - prioridadValor[b.prioridad];
      }
      // Finalmente, ordenar por fecha de creación
      return new Date(a.fechahoracreacion) - new Date(b.fechahoracreacion);
    });
    console.log(Data)
    dispatch({ type: INCIDENCIAS_SUCCESS, payload: { Data, reuniones } });

  } catch (error) {
    dispatch(handleError(INCIDENCIAS_FAILURE, error, useNavigate()));
  }
};


export const postIncidencia = (incidenciaData) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: POST_INCIDENCIA_REQUEST });

  try {
    const token = localStorage.getItem('token');
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
    dispatch(handleError(INCIDENCIAS_FAILURE, error, useNavigate()));
  }
};

export const replyIncidencia = (incidencia_id, contenido, remitente_id, remitente_tipo) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }
  
  dispatch({ type: INCIDENCIAS_REPLY_REQUEST });
  try {
      const token = localStorage.getItem('token');
      await axios.post(`${URI}/api/incidencia/responder`, { incidencia_id, contenido, remitente_id, remitente_tipo },{
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      
      dispatch({ type: INCIDENCIAS_REPLY_SUCCESS});
      
  } catch (error) {
      console.error('Error respondiendo mensajes:', error);
      dispatch(handleError(INCIDENCIAS_REPLY_FAILURE, error, useNavigate()));
  }
};

export const confirmReplyIncidencia = (incidencia_id) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: INCIDENCIAS_CONFIRM_REQUEST });
  try {
    const token = localStorage.getItem('token');


    const response = await axios.put(`${URI}/api/incidencia/reabrir/${incidencia_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });


    dispatch({ type: INCIDENCIAS_CONFIRM_SUCCESS , payload: response.data });
  } catch (error) {
    console.error('Error al confirmar respuesta de la incidencia:', error);
    dispatch(handleError(INCIDENCIAS_CONFIRM_FAILURE, error, useNavigate()));
  }
};

export const rejectIncidencia = (incidencia_id) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: INCIDENCIAS_CONFIRM_REQUEST });
  try {
    const token = localStorage.getItem('token');

    const response = await axios.put(`${URI}/api/incidencia/cerrar/${incidencia_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: INCIDENCIAS_CONFIRM_SUCCESS , payload: response.data });
  } catch (error) {
    console.error('Error al rechazar respuesta de la incidencia:', error);
    dispatch(handleError(INCIDENCIAS_CONFIRM_FAILURE, error, useNavigate()));
  }
};

export const addReunion = (incidencia_id, tema, lugar, hora, fecha) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: REUNION_POST });
  try {
    const token = localStorage.getItem('token');

    console.log(incidencia_id, tema, lugar, hora, fecha);
    const response = await axios.post(`${URI}/api/reunion/programar`, { incidencia_id, tema, lugar, hora, fecha }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: REUNION_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error al agregar una reunion:', error);
    dispatch(handleError(REUNION_FAILURE, error, useNavigate()));
  }
};
import axios from 'axios';
import { URI } from '../config';
import { useNavigate } from 'react-router-dom';
import { handleError, isTokenExpired } from './errorActions';
import { logout } from './authActions';

export const FORO_REQUEST = 'FORO_REQUEST';
export const FORO_SUCCESS = 'FORO_SUCCESS';
export const FORO_FAILURE = 'FORO_FAILURE';

export const FORO_RESPUESTAS_REQUEST = 'FORO_RESPUESTAS-REQUEST';
export const FORO_RESPUESTAS_SUCCESS = 'FORO_RESPUESTAS_SUCCESS';

export const FORO_ADD_REQUEST = 'FORO_ADD_REQUEST';
export const RESPUESTA_ADD_REQUEST = 'RESPUESTA_ADD_REQUEST';
export const RESPUESTA_ADD_SUCCESS = 'RESPUESTA_ADD_SUCCESS';



export const CREATE_FORO_SUCCESS = 'CREATE_FORO_SUCCESS';
export const UPDATE_FORO_SUCCESS = 'UPDATE_FORO_SUCCESS';
export const DELETE_FORO_SUCCESS = 'DELETE_FORO_SUCCESS';

export const getPostForo = () => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }
  
  dispatch({ type: FORO_REQUEST });
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${URI}/api/foro/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({
      type: FORO_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    console.error('Error fetching preguntas frecuentes:', error);
    dispatch(handleError(FORO_FAILURE, error, useNavigate()));
  }
};

export const GetRespuestasPost = ( post_id ) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: FORO_RESPUESTAS_REQUEST });

  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${URI}/api/foro/reply/${post_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    dispatch({
      type: FORO_RESPUESTAS_SUCCESS,
      payload: response.data
    });

  } catch (error) {
    console.error('Error en peticion de respuestas foro', error);
    dispatch(handleError(FORO_FAILURE, error));
  }
};

export const AddPostForo = (autor_id, pregunta, contenido, archivo, es_anonimo) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: FORO_ADD_REQUEST });

  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${URI}/api/foro/posts`, { autor_id, pregunta, contenido, archivo, es_anonimo }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);

    dispatch({
      type: CREATE_FORO_SUCCESS,
      payload: response.data
    });
    dispatch(getPostForo());
  } catch (error) {
    console.error('Error creando post en foro:', error);
    dispatch(handleError(FORO_FAILURE, error));
  }
};

export const AddRespuestaPost = (postforo_id, autor_id, contenido) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: RESPUESTA_ADD_REQUEST });

  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(`${URI}/api/foro/reply`, { postforo_id, autor_id, contenido } , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: RESPUESTA_ADD_SUCCESS,
      payload: response.data
    });
    dispatch(GetRespuestasPost(postforo_id))

  } catch (error) {
    console.error('Error agregando respuesta:', error);
    dispatch(handleError(FORO_FAILURE, error));
  }
};

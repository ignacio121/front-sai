import axios from 'axios';
import { URI } from '../config';
import { useNavigate } from 'react-router-dom';
import { handleError, isTokenExpired } from './errorActions';
import { logout } from './authActions';

export const PREGUNTAS_FRECUENTES_REQUEST = 'PREGUNTAS_FRECUENTES_REQUEST';
export const PREGUNTAS_FRECUENTES_SUCCESS = 'PREGUNTAS_FRECUENTES_SUCCESS';
export const PREGUNTAS_FRECUENTES_FAILURE = 'PREGUNTAS_FRECUENTES_FAILURE';
export const CREATE_PREGUNTA_FRECUENTE_SUCCESS = 'CREATE_PREGUNTA_FRECUENTE_SUCCESS';
export const UPDATE_PREGUNTA_FRECUENTE_SUCCESS = 'UPDATE_PREGUNTA_FRECUENTE_SUCCESS';
export const DELETE_PREGUNTA_FRECUENTE_SUCCESS = 'DELETE_PREGUNTA_FRECUENTE_SUCCESS';

export const fetchPreguntasFrecuentes = () => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }
  
  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${URI}/api/faq`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    dispatch({
      type: PREGUNTAS_FRECUENTES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching preguntas frecuentes:', error);
    dispatch(handleError(PREGUNTAS_FRECUENTES_FAILURE, error, useNavigate()));
  }
};

// Acción para crear una nueva pregunta frecuente
export const createPreguntaFrecuente = (nuevaPregunta) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = localStorage.getItem('token');;

    const response = await axios.post(`${URI}/api/faq`, nuevaPregunta, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    dispatch({
      type: CREATE_PREGUNTA_FRECUENTE_SUCCESS,
      payload: response.data
    });
    dispatch(fetchPreguntasFrecuentes());
  } catch (error) {
    console.error('Error creating pregunta frecuente:', error);
    dispatch(handleError(PREGUNTAS_FRECUENTES_FAILURE, error, useNavigate()));
  }
};

// Acción para actualizar una pregunta frecuente
export const updatePreguntaFrecuente = (id, preguntaActualizada) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = localStorage.getItem('token');

    const response = await axios.put(`${URI}/api/faq/${id}`, preguntaActualizada, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    dispatch({
      type: UPDATE_PREGUNTA_FRECUENTE_SUCCESS,
      payload: response.data
    });
    dispatch(fetchPreguntasFrecuentes());
  } catch (error) {
    console.error('Error updating pregunta frecuente:', error);
    dispatch(handleError(PREGUNTAS_FRECUENTES_FAILURE, error, useNavigate()));
  }
};

// Acción para eliminar una pregunta frecuente
export const deletePreguntaFrecuente = (id) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = localStorage.getItem('token');

    await axios.delete(`${URI}/api/faq/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: DELETE_PREGUNTA_FRECUENTE_SUCCESS,
      payload: { id }
    });
    dispatch(fetchPreguntasFrecuentes());
  } catch (error) {
    console.error('Error deleting pregunta frecuente:', error);
    dispatch(handleError(PREGUNTAS_FRECUENTES_FAILURE, error, useNavigate()));
  }
};

// Acción para obtener preguntas frecuentes por categoría
export const fetchPreguntasFrecuentesByCategoria = (categoriaId) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }
  
  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${URI}/api/faq/categoria/${categoriaId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: PREGUNTAS_FRECUENTES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching preguntas frecuentes by categoria:', error);
    dispatch(handleError(PREGUNTAS_FRECUENTES_FAILURE, error, useNavigate()));
  }
};

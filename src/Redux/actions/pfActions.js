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
    let categoria = 1;
    let responses = [];

    // Iterar hasta que no se reciba respuesta del servidor
    while (true) {
      try {
        const response = await axios.get(`${URI}/api/faq/categoria/${categoria}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.length === 0) {
          break; // Si la respuesta está vacía, salir del bucle
        }

        responses = responses.concat(response.data); // Concatenar las respuestas al array principal
        categoria++; // Incrementar la categoría para la siguiente petición

      } catch (error) {
        console.error(`Error fetching preguntas frecuentes para categoría ${categoria}:`, error);
        // Manejar errores específicos si es necesario
        break; // Salir del bucle en caso de error
      }
    }

    dispatch({
      type: PREGUNTAS_FRECUENTES_SUCCESS,
      payload: responses
    });

  

  } catch (error) {
    console.error('Error fetching preguntas frecuentes:', error);
    dispatch(handleError(PREGUNTAS_FRECUENTES_FAILURE, error, useNavigate()));
  }
};

// Acción para crear una nueva pregunta frecuente
export const createPreguntaFrecuente = ( pregunta, respuesta, categoriafaq_id ) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = localStorage.getItem('token');;

    const response = await axios.post(`${URI}/api/faq`, { categoriafaq_id, pregunta, respuesta }, {
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
export const updatePreguntaFrecuente = (id, pregunta, respuesta, categoriafaq_id) => async (dispatch) => {
  if (isTokenExpired()) {
    dispatch(logout());
    return;
  }

  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = localStorage.getItem('token');

    const response = await axios.put(`${URI}/api/faq/${id}`, { categoriafaq_id, pregunta, respuesta }, {
      headers: {
        Authorization: `Bearer ${token}`
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

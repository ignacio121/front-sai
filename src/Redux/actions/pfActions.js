import axios from 'axios';
import { URI } from '../config';

export const PREGUNTAS_FRECUENTES_REQUEST = 'PREGUNTAS_FRECUENTES_REQUEST';
export const PREGUNTAS_FRECUENTES_SUCCESS = 'PREGUNTAS_FRECUENTES_SUCCESS';
export const PREGUNTAS_FRECUENTES_FAILURE = 'PREGUNTAS_FRECUENTES_FAILURE';
export const CREATE_PREGUNTA_FRECUENTE_SUCCESS = 'CREATE_PREGUNTA_FRECUENTE_SUCCESS';
export const UPDATE_PREGUNTA_FRECUENTE_SUCCESS = 'UPDATE_PREGUNTA_FRECUENTE_SUCCESS';
export const DELETE_PREGUNTA_FRECUENTE_SUCCESS = 'DELETE_PREGUNTA_FRECUENTE_SUCCESS';

export const fetchPreguntasFrecuentes = () => async (dispatch, getState) => {
  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = getState().auth.token;

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
    dispatch({
      type: PREGUNTAS_FRECUENTES_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

// Acción para crear una nueva pregunta frecuente
export const createPreguntaFrecuente = (nuevaPregunta) => async (dispatch, getState) => {
  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = getState().auth.token;

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
    dispatch({
      type: PREGUNTAS_FRECUENTES_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

// Acción para actualizar una pregunta frecuente
export const updatePreguntaFrecuente = (id, preguntaActualizada) => async (dispatch, getState) => {
  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = getState().auth.token;

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
    dispatch({
      type: PREGUNTAS_FRECUENTES_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

// Acción para eliminar una pregunta frecuente
export const deletePreguntaFrecuente = (id) => async (dispatch, getState) => {
  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = getState().auth.token;

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
    dispatch({
      type: PREGUNTAS_FRECUENTES_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

// Acción para obtener preguntas frecuentes por categoría
export const fetchPreguntasFrecuentesByCategoria = (categoriaId) => async (dispatch, getState) => {
  dispatch({ type: PREGUNTAS_FRECUENTES_REQUEST });

  try {
    const token = getState().auth.token;

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
    dispatch({
      type: PREGUNTAS_FRECUENTES_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};

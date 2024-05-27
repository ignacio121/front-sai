import axios from 'axios';
import { URI } from '../config';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const CATEGORIAS_REQUEST ='CATEGORIAS_REQUEST';
export const CATEGORIAS_SUCCESS = 'CATEGORIAS_SUCCESS';
export const CATEGORIAS_FAILURE = 'CATEGORIAS_FAILURE';


export const getCategorias = () => async (dispatch, getState) => {
  dispatch({ type: CATEGORIAS_REQUEST });

  try {
    const token = getState().auth.token;
    const response = await axios.get(`${URI}/api/incidencia/categoriasPadre`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: CATEGORIAS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: CATEGORIAS_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};


export const login = (rut, contraseña) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  
  try {
    let userResponse = null;
    const { data: loginResponse } = await axios.post(`${URI}/api/auth/login`, { rut, contraseña });
    
    const { token, userId, userType, rol, carrera_id } = loginResponse;
    localStorage.setItem('token', token);

    console.log(userType);
    console.log(loginResponse);

    if (loginResponse && userType === 'alumno') {
      const { data } = await axios.get(`${URI}/alumnos/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      userResponse = data;
    } else if (loginResponse && userType === 'personal') {
      const { data } = await axios.get(`${URI}/personal/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      userResponse = data;
    } 

    const sesion = { userId, userType, rol, carrera_id };

    dispatch({ type: LOGIN_SUCCESS, payload: { token, sesion, user: userResponse } });

  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      error: error.response ? error.response.data : { message: error.message }
    });
  }
};



export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};
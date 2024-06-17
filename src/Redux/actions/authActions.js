import axios from 'axios';
import { URI } from '../config';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const login = (rut, contraseña) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data: loginResponse } = await axios.post(`${URI}/api/auth/login`, { rut, contraseña });
    const { token, userId, userType, rol, carrera_id } = loginResponse;

    localStorage.setItem('loginResponse', JSON.stringify(loginResponse));
    let userResponse = null;
    if (userType === 'alumno') {
      const { data } = await axios.get(`${URI}/alumnos/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      userResponse = data;
    } else if (userType === 'personal') {
      const { data } = await axios.get(`${URI}/personal/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      userResponse = data;
    }

    const sesion = { userId, userType, rol, carrera_id };
    localStorage.setItem('sesion', JSON.stringify(sesion));
    localStorage.setItem('user', JSON.stringify(userResponse));

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
  localStorage.removeItem('sesion');
  dispatch({ type: LOGOUT });
};

import axios from 'axios';
import { URI } from '../config';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

const TOKEN_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hora en milisegundos

export const login = (rut, contraseña) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data: loginResponse } = await axios.post(`${URI}/api/auth/login`, { rut, contraseña });
    const { token, userId, userType, rol, carrera_id } = loginResponse;

    const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime);
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

    // Establecer un temporizador para eliminar el token después de 1 hora
    setTimeout(() => {
      dispatch(logout());
    }, TOKEN_EXPIRATION_TIME);

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
  localStorage.removeItem('tokenExpiration');
  localStorage.removeItem('sesion');
  localStorage.removeItem('user');
  dispatch({ type: LOGOUT });
};

import axios from 'axios';
import { URI } from '../config';
import { isTokenExpired } from './errorActions';
import { logout } from './authActions';

export const DESTINATARIOS_REQUEST = 'DESTINATARIOS_REQUEST';
export const DESTINATARIOS_SUCCESS = 'DESTINATARIOS_SUCCESS';
export const DESTINATARIOS_FAILURE = 'DESTINATARIOS_FAILURE';

export const getDestinatarios = () => async (dispatch, getState) => {
    if (isTokenExpired()) {
        dispatch(logout());
        return;
      }

    dispatch({ type: DESTINATARIOS_REQUEST });

    try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${URI}/personal`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: DESTINATARIOS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch(logout());
        console.error('Error fetching destinatarios:', error);
        dispatch({
            type: DESTINATARIOS_FAILURE,
            error: error.response ? error.response.data : {
                message: error.message
            }
        });
    }
};

import axios from 'axios';
import { URI } from '../config';

export const DESTINATARIOS_REQUEST = 'DESTINATARIOS_REQUEST';
export const DESTINATARIOS_SUCCESS = 'DESTINATARIOS_SUCCESS';
export const DESTINATARIOS_FAILURE = 'DESTINATARIOS_FAILURE';

export const getDestinatarios = () => async (dispatch, getState) => {
    console.log('getDestinatarios action called');
    dispatch({ type: DESTINATARIOS_REQUEST });

    try {
        const token = getState().auth.token;
        console.log('Token:', token);

        const response = await axios.get(`${URI}/personal`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('Response data:', response.data);
        dispatch({ type: DESTINATARIOS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error fetching destinatarios:', error);
        dispatch({
            type: DESTINATARIOS_FAILURE,
            error: error.response ? error.response.data : {
                message: error.message
            }
        });
    }
};
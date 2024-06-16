import axios from 'axios';
import { URI } from '../config';

export const ESTUDIANTES_REQUEST = 'ESTUDIANTES_REQUEST';
export const ESTUDIANTES_SUCCESS = 'ESTUDIANTES_SUCCESS';
export const ESTUDIANTES_ID_SUCCESS = 'ESTUDIANTES_ID_SUCCESS';
export const ESTUDIANTES_FAILURE = 'ESTUDIANTES_FAILURE';

export const getEstudiantesId = (id) => async (dispatch, getState) => {
    dispatch({ type: ESTUDIANTES_REQUEST });
    try {
        const token = getState().auth.token;

        const response = await axios.get(`${URI}/alumnos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({ type: ESTUDIANTES_ID_SUCCESS, payload: response.data });
        
    } catch (error) {
        console.error('Error fetching ESTUDIANTES:', error);
        dispatch({
            type: ESTUDIANTES_FAILURE,
            error: error.response ? error.response.data : {
                message: error.message
            }
        });
    }
};

import axios from 'axios';
import { URI } from '../config';


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
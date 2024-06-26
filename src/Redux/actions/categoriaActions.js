import axios from 'axios';
import { URI } from '../config';
import { handleError, isTokenExpired } from './errorActions';
import { logout } from './authActions';

export const CATEGORIAS_REQUEST ='CATEGORIAS_REQUEST';
export const CATEGORIAS_SUCCESS = 'CATEGORIAS_SUCCESS';
export const CATEGORIAS_FAILURE = 'CATEGORIAS_FAILURE';

export const getCategorias = () => async (dispatch) => {
    if (isTokenExpired()) {
        dispatch(logout());
        return;
      }
      
    dispatch({ type: CATEGORIAS_REQUEST });
  
    try {
        const token = localStorage.getItem('token');
        const categoriasPadreResponse = await axios.get(`${URI}/api/incidencia/categoriasPadre`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const categoriasPadre = categoriasPadreResponse.data;
        const categoriasHijo = [];

        for (const categoriaPadre of categoriasPadre) {
            const categoriasHijoResponse = await axios.get(`${URI}/api/incidencia/categoriasHijo/${categoriaPadre.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            categoriasHijo.push(...categoriasHijoResponse.data);
        }
        
        dispatch({ type: CATEGORIAS_SUCCESS, payload: {categoriasHijo, categoriasPadre}});
    } catch (error) {
        dispatch(handleError(CATEGORIAS_FAILURE, error));
    }
};

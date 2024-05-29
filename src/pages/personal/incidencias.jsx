import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/actions/authActions';
import { getIncidenciasPersonal } from '../../Redux/actions/incidenciasActions';

function IncidenciasPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sesion, token } = useSelector((state) => state.auth);
  const { incidencias } = useSelector((state) => state.incidencias);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      console.log(incidencias)
      dispatch(getIncidenciasPersonal(sesion.userId, token))
    }
  }, [token, navigate, dispatch, sesion, token]); // agregar sesion y token para produccion

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <>
      {token ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <p>incidencia Page</p>
        </>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </>
  );
}

export default IncidenciasPage;
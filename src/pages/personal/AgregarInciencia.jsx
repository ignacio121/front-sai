import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AddIncidentPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      {token ? (
        <>
          <p>Proxima pagina que administradores agreguen incidencias</p>
        </>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </>
  );
}

export default AddIncidentPage;
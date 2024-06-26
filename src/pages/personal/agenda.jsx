// src/pages/AgendaPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CalendarioReuniones from '../../components/CalendarioReuniones'; // Ajusta la ruta según sea necesario

function AgendaPage() {
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
          <CalendarioReuniones />
        </>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </>
  );
}

export default AgendaPage;

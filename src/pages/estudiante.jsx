import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function EstudiantePage() {
  const navigate = useNavigate();
  const { token , userInfo, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    console.log(userInfo);
  }, [token, userInfo, navigate]);
  
  return (
    <div>
      {token ? (
        <div>
          <h1>Estudiante Page</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </div>
  );
}

export default EstudiantePage;

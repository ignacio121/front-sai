import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/actions/authActions';

function EstudiantePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      {token ? (
        <div>
          <h1>Estudiante Page</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </div>
  );
}

export default EstudiantePage;

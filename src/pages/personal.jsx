import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Complete, NavbarLat, NavbarSup } from '../style/personal.style.js';

function PersonalPage() {
  const navigate = useNavigate();
  const { token , userInfo, logout } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    console.log(userInfo);
  }, [token, userInfo, navigate]);
  
  return (
    <Complete>
      {token ? (
        <NavbarSup>
          <NavbarLat>
          </NavbarLat>
        </NavbarSup>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </Complete>
  );
}

export default PersonalPage;

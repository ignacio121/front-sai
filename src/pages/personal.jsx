import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/actions/authActions';
import NavBar from '../components/navbar';
import IncidenciasPage from './personal/incidencias';
import AgendaPage from './personal/agenda';

function PersonalPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navPath = useSelector((state) => state.nav.navPath);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (navPath === 'logout') {
      handleLogout();
      navigate('/');
    }
  }, [navPath, navigate, handleLogout]);

  const renderContent = () => {
    switch (navPath) {
      case 'incidencias':
        return <IncidenciasPage />;
      case 'agenda':
        return <AgendaPage />;
      default:
        return <div>Seleccione una opción del menú</div>;
    }
  };

  return (
    <>
      {token ? (
        <NavBar>
          {renderContent()}
        </NavBar>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </>
  );
}

export default PersonalPage;
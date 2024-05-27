import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/actions/authActions';
import NavBar from '../components/navbar';


function PersonalPage() {
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
    <>
      {token ? (
        <NavBar>
          <button onClick={handleLogout}>Logout</button>
        </NavBar>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </>
  );
}

export default PersonalPage;
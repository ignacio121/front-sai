import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Barra from '../components/Barra';
import Estudiante from '../components/estudiante'; 
import Options  from '../components/options';
import Anuncios from '../components/anuncios';

function EstudiantePage() {
  const { token, userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
    console.log(userInfo)
    console.log(userInfo?.nombre, userInfo?.apellido,userInfo?.rut, userInfo?.foto); 
  }, [token, userInfo, navigate]);

  return (
    <div>
      {token ? (
        <>
          <Barra />
          <div style={{ marginTop: "2%", display: 'flex', flexDirection: 'row' }}>
            <Anuncios />
            <div style={{ marginLeft: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Estudiante 
                nombre={userInfo?.nombre} 
                apellido={userInfo?.apellido}
                rut ={userInfo?.rut}
                email ={userInfo?.email}
                foto={userInfo?.foto}
                carrera ={userInfo?.carrera['nombre']}
              />
              <Options />
            </div>
          </div>
        </>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </div>
  );
}

export default EstudiantePage;

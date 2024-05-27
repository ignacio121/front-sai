import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Barra from '../components/Barra';
import Estudiante from '../components/estudiante'; 
import Options from '../components/options';
import Anuncios from '../components/anuncios';
import { getCategorias } from '../Redux/actions/authActions';

function EstudiantePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, categorias, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      dispatch(getCategorias());
    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    console.log('Categorías:', categorias);
  }, [categorias]);

  return (
    <div>
      {token ? (
        <>
          <Barra />
          <div style={{ marginTop: "2%", display: 'flex', flexDirection: 'row' }}>
            <Anuncios />
            <div style={{ marginLeft: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <Estudiante 
                nombre={user?.nombre} 
                apellido={user?.apellido}
                rut={user?.rut}
                email={user?.email}
                foto={user?.foto}
                carrera={user?.carrera['nombre']}
              />
              <Options categorias={categorias} />
              {loading ? (
                <p>Cargando categorías...</p>
              ) : error ? (
                <p>Error al cargar categorías: {error.message}</p>
              ) : null}
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

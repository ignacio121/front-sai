import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Barra from '../components/Barra';
import Estudiante from '../components/estudiante'; 
import Options from '../components/options';
import Anuncios from '../components/anuncios';
import { getCategorias } from '../Redux/actions/categoriaActions';
import { getDestinatarios } from '../Redux/actions/destinatarioActions';

function EstudiantePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const { categorias } = useSelector((state) => state.categorias);
  const { destinatarios } = useSelector((state) => state.destinatarios);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      dispatch(getCategorias());
      dispatch(getDestinatarios());
    }
  }, [token, navigate, dispatch]);

  useEffect(() => {
    if (categorias.length > 0) {
      console.log('Categorías:', categorias);
    }
  }, [categorias]);

  useEffect(() => {
    if (destinatarios.length > 0) {
      console.log('Destinatarios:', destinatarios);
    }
  }, [destinatarios]);

  useEffect(() => {
    if (user) {
      console.log('Estudiante:', {
        nombre: user.nombre,
        apellido: user.apellido,
        rut: user.rut,
        email: user.email,
        foto: user.foto,
        carrera: user.carrera?.nombre
      });
    }
  }, [user]);

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
                carrera={user?.carrera?.nombre}
              />
              <Options 
                categorias={categorias}
                destinatarios={destinatarios} 
              />
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

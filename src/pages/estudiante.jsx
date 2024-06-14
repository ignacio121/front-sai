import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Barra from '../components/Barra';
import Estudiante from '../components/estudiante'; 
import Options from '../components/options';
import Anuncios from '../components/anuncios';
import { getCategorias } from '../Redux/actions/categoriaActions';
import { getDestinatarios } from '../Redux/actions/destinatarioActions';
import { fetchPreguntasFrecuentes } from '../Redux/actions/pfActions';

function EstudiantePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const { categorias } = useSelector((state) => state.categorias);
  const { destinatarios } = useSelector((state) => state.destinatarios);
  const { preguntasFrecuentes } = useSelector((state) => state.preguntasFrecuentes);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      dispatch(getCategorias());
      dispatch(getDestinatarios());
      dispatch(fetchPreguntasFrecuentes());
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
      console.log('Usuario:', user);
      console.log('userId:', user.userId); // Acceder al userId desde user
      console.log('carrera_id:', user.carrera_id); // Acceder a carrera_id desde user
    }
  }, [user]);

  useEffect(() => {
    if (preguntasFrecuentes) {
      console.log('Preguntas Frecuentes:', preguntasFrecuentes);
      // Aquí podrías manejar las preguntas frecuentes y mostrarlas en tu interfaz
    }
  }, [preguntasFrecuentes]);
  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
  console.log("response",loginResponse)

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
                userId={user?.userId}  // Pasar userId desde user
                carreraId={user?.carrera_id}  // Pasar carrera_id desde user
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

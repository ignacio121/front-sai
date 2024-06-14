import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/actions/authActions';
import { getIncidenciasPersonal } from '../../Redux/actions/incidenciasActions';
import { Categoria, Estado, Fecha, IncidenciasContainer, IncidenciasMainContainer, MensajeView, Prioridad, Separador, UltimoMensaje } from '../../style/incidencia.style';

function IncidenciasPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sesion, token } = useSelector((state) => state.auth);
  const { incidencias } = useSelector((state) => state.incidencias);

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else if (!incidencias) {
      dispatch(getIncidenciasPersonal(sesion.userId, token))
    }
    console.log(incidencias)
  }, [token, navigate, dispatch, sesion, incidencias]); // agregar sesion y token para produccion

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <>
      {token ? (
        <>
          
          <IncidenciasMainContainer>
          <IncidenciasContainer>
              <Estado/>
              <Prioridad> Alta </Prioridad>
              <Separador/>
              <Categoria> Ramos </Categoria>
              <Separador/>
              <UltimoMensaje> Envió este comunicado, debido a que las salas las cuales estamos tenie... </UltimoMensaje>
              <MensajeView/>
              <Separador/>
              <Fecha> 22-04-2022 </Fecha>
            </IncidenciasContainer>
            <IncidenciasContainer>
              <Estado/>
              <Prioridad> Alta </Prioridad>
              <Separador/>
              <Categoria> Ramos </Categoria>
              <Separador/>
              <UltimoMensaje> Envió este comunicado, debido a que las salas las cuales estamos tenie... </UltimoMensaje>
              <MensajeView/>
              <Separador/>
              <Fecha> 22-04-2022 </Fecha>
            </IncidenciasContainer>
            <IncidenciasContainer>
              <Estado/>
              <Prioridad> Alta </Prioridad>
              <Separador/>
              <Categoria> Ramos </Categoria>
              <Separador/>
              <UltimoMensaje> Envió este comunicado, debido a que las salas las cuales estamos tenie... </UltimoMensaje>
              <MensajeView/>
              <Separador/>
              <Fecha> 22-04-2022 </Fecha>
            </IncidenciasContainer>
            <IncidenciasContainer>
              <Estado/>
              <Prioridad> Alta </Prioridad>
              <Separador/>
              <Categoria> Ramos </Categoria>
              <Separador/>
              <UltimoMensaje> Envió este comunicado, debido a que las salas las cuales estamos tenie... </UltimoMensaje>
              <MensajeView/>
              <Separador/>
              <Fecha> 22-04-2022 </Fecha>
            </IncidenciasContainer>
            <IncidenciasContainer>
              <Estado/>
              <Prioridad> Alta </Prioridad>
              <Separador/>
              <Categoria> Ramos </Categoria>
              <Separador/>
              <UltimoMensaje> Envió este comunicado, debido a que las salas las cuales estamos tenie... </UltimoMensaje>
              <MensajeView/>
              <Separador/>
              <Fecha> 22-04-2022 </Fecha>
            </IncidenciasContainer>
            <IncidenciasContainer>
              <Estado/>
              <Prioridad> Alta </Prioridad>
              <Separador/>
              <Categoria> Ramos </Categoria>
              <Separador/>
              <UltimoMensaje> Envió este comunicado, debido a que las salas las cuales estamos tenie... </UltimoMensaje>
              <MensajeView/>
              <Separador/>
              <Fecha> 22-04-2022 </Fecha>
            </IncidenciasContainer>
            <IncidenciasContainer>
              <Estado/>
              <Prioridad> Alta </Prioridad>
              <Separador/>
              <Categoria> Ramos </Categoria>
              <Separador/>
              <UltimoMensaje> Envió este comunicado, debido a que las salas las cuales estamos tenie... </UltimoMensaje>
              <MensajeView/>
              <Separador/>
              <Fecha> 22-04-2022 </Fecha>
            </IncidenciasContainer>
          </IncidenciasMainContainer>
        </>
      ) : (
        <p>Acceso denegado. Por favor, inicia sesión para acceder a esta página.</p>
      )}
    </>
  );
}

export default IncidenciasPage;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { getIncidenciasPersonal } from '../../Redux/actions/incidenciasActions';
import { Categoria, Estado, Fecha, IncidenciasContainer, IncidenciasMainContainer, MensajeView, Prioridad, Separador, UltimoMensaje } from '../../style/incidencia.style';
import ReplyIncident from '../../components/replyIncident';
import LoaderComponent from '../../components/loader';

function IncidenciasPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sesion, token } = useSelector((state) => state.auth);
  const { incidencias, loading } = useSelector((state) => state.incidencias);

  const [stateReplyIncident,changeReplyIncident] = useState({activo: false, incidencia: null});

  const ultimaRespuesta = (respuestas) => {
    if (respuestas.length === 0) {
      return false;
    }
    const ultimaRespuesta = respuestas[respuestas.length - 1];
    return ultimaRespuesta.remitente_tipo !== sesion.userType;
  };

  const OpenReplyIncident = (incidencia) => {
    changeReplyIncident({activo: true, incidencia: incidencia})
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
        dispatch(getIncidenciasPersonal(sesion.userId, token));
    }
  }, [token, navigate, dispatch, sesion, incidencias]);
  
  return (
    <>
      {loading || incidencias ? (
        <>   
          <IncidenciasMainContainer>
          {incidencias && incidencias.map(incidencia =>(
            <IncidenciasContainer key={incidencia.id} onClick={() => OpenReplyIncident(incidencia)}>
                <Estado estado={incidencia.estado}/>
                <Prioridad> {incidencia.prioridad} </Prioridad>
                <Separador/>
                <Categoria> {incidencia.categoriaNombre} </Categoria>
                <Separador/>
                <UltimoMensaje> {incidencia.descripcion} </UltimoMensaje>
                <MensajeView ultimaRespuesta={ultimaRespuesta(incidencia.respuestaincidencia)}/>
                <Separador/>
                <Fecha>{format(new Date(incidencia.fechahoracreacion), 'dd-MM-yyyy')}</Fecha>
              </IncidenciasContainer>
            ))}
          </IncidenciasMainContainer>


          {stateReplyIncident.incidencia && <ReplyIncident state={stateReplyIncident.activo} changeState={changeReplyIncident} incidencia={stateReplyIncident.incidencia}/>}
        </>
      ) : (
        <LoaderComponent/>
      )} 
    </>
  );
}

export default IncidenciasPage;
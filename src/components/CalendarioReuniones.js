import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el archivo de idioma español para Moment.js
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import LoaderComponent from './loader';
import { getIncidencias } from '../Redux/actions/incidenciasActions';
import InfoReunion from './infoReunion';

// Configura el idioma español para Moment.js
moment.locale('es');
const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
        toolbar.onNavigate('TODAY');
    };

    const changeView = (view) => {
        toolbar.onView(view);
    };

    const label = () => {
        const date = moment(toolbar.date);
        if (toolbar.view === 'day') {
            return (
                <LabelDate>
                    {date.format('D [de] MMMM YYYY')}
                </LabelDate>
            );
        } else {
            return (
                <LabelDate>
                    {date.format('MMMM YYYY')}
                </LabelDate>
            );
        }
    };

    return (
        <ToolbarContainer>
            <Button onClick={goToBack}>
                <FaChevronLeft />
            </Button>
            <Button onClick={goToCurrent}>
                Hoy
            </Button>
            <Button onClick={goToNext}>
                <FaChevronRight />
            </Button>
            <LabelDateWrapper>
                {label()}
            </LabelDateWrapper>
            <ViewButtonsContainer>
                <Button onClick={() => changeView('month')}>Mes</Button>
                <Button onClick={() => changeView('week')}>Semana</Button>
                <Button onClick={() => changeView('day')}>Día</Button>
            </ViewButtonsContainer>
        </ToolbarContainer>
    );
};

const CalendarioReuniones = () => {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const { incidencias, reuniones, loading } = useSelector((state) => state.incidencias);
  const { sesion } = useSelector((state) => state.auth);

  const [stateInfoReunion, changeInfoReunion] = useState({ activo: false, reunion: null });

  useEffect(() => {
      if (reuniones && incidencias) {
          setEvents(reuniones.map(reunion => {
              const start = moment(`${reunion.fecha}T${reunion.hora}`).toDate();
              const end = moment(start).add(30, 'minutes').toDate();
              return {
                  id: reunion.id,
                  tema: reunion.tema,
                  title: reunion.tema,
                  start: start,
                  end: end,
                  lugar: reunion.lugar,
                  tooltip: `${reunion.tema}\nHora: ${reunion.hora}\nLugar: ${reunion.lugar}\nAlumno: ${reunion.alumnoNombre || 'N/A'} ${reunion.alumnoApellido || 'N/A'}\nEmail: ${reunion.alumnoEmail || 'N/A'}\nRUT: ${reunion.alumnoRut || 'N/A'}`,
                  incidencia_id: reunion.incidencia_id
              };
          }));
      } else if (!incidencias && !loading) {
          dispatch(getIncidencias(sesion.userId, sesion.userType));
      }
  }, [dispatch, reuniones, loading, incidencias, sesion]);

  const handleEventSelect = (reu) => {
      console.log(reu);
      changeInfoReunion({ activo: true, reunion: reu });
  };

  const eventPropGetter = (event) => {
      return {
          'data-toggle': 'tooltip',
          'data-placement': 'top',
          'title': event.tooltip
      };
  };

  const customMessages = {
      today: 'Hoy',
      previous: 'Anterior',
      next: 'Siguiente',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
  };

  const today = moment().startOf('day');
  const minTime = today.clone().set({ hour: 6, minute: 0 }).toDate();
  const maxTime = today.clone().set({ hour: 23, minute: 0 }).toDate();

  return (
      <>
          {loading ? (
              <LoaderComponent />
          ) : (
              <>
                  <CalendarContainer>
                      <Calendar
                          localizer={localizer}
                          events={events}
                          startAccessor="start"
                          endAccessor="end"
                          onSelectEvent={handleEventSelect}
                          eventPropGetter={eventPropGetter}
                          components={{ toolbar: CustomToolbar }}
                          messages={customMessages}
                          style={{ height: 500 }}
                          min={minTime}
                          max={maxTime}
                      />
                  </CalendarContainer>
                  {stateInfoReunion.activo && <InfoReunion state={stateInfoReunion.activo} changeState={changeInfoReunion} reunion={stateInfoReunion.reunion} origen={false} />}
              </>
          )}
      </>
  );
};

export default CalendarioReuniones;
  
  const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    z-index: 1;
  `;
  
  const CalendarContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    font-family: "Bahnschrift", sans-serif;
    z-index: 1;
  `;
  
  const Button = styled.button`
    background-color: #1e98d7;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-family: "Bahnschrift", sans-serif;
    width: 70px;
  
    &:hover {
      background-color: #2886b5;
    }
  `;
  
  const ViewButtonsContainer = styled.div`
    display: flex;
    gap: 5px;
  `;
  
  const LabelDateWrapper = styled.div`
    flex: 1;
    text-align: center;
  `;
  
  const LabelDate = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    color: #1e98d7;
    font-family: "Bahnschrift", sans-serif;
    white-space: nowrap;
  `;
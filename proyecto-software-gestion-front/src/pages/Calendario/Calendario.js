import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { agregarevento, getAllData } from '../../services/Funciones_Calendario';

const localizer = momentLocalizer(moment);

const Calendario = ({ usuario }) => {
  const [eventos, setEventos] = useState([]);

  const actualizarEventos = async () => {
    try {
      const data = await getAllData();

      const eventosMapeados = data.map((evento) => ({
        start: new Date(evento.fecha),
        end: new Date(evento.fecha),
        title: evento.contenido,
      }));

      setEventos(eventosMapeados);
    } catch (error) {
      console.error('Error al actualizar eventos: ', error);
    }
  };

  const handleSelect = async ({ start, end }) => {
    if (usuario && usuario.role === 'ADMIN') {
      const titulo = window.prompt('Ingrese el título del evento:');
      if (titulo) {
        try {
          await agregarevento('Eventos', titulo, start, '');
          await actualizarEventos();
        } catch (error) {
          console.error('Error al guardar el evento: ', error);
        }
      }
    }
  };

  const handleSelectEvent = (evento) => {
    if (usuario && usuario.role === 'ADMIN') {
      if (window.confirm('¿Seguro que desea eliminar este evento?')) {
        const updatedEventos = eventos.filter((ev) => ev !== evento);
        setEventos(updatedEventos);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await actualizarEventos();
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'rgb(63,0,105)', color: 'black' }}>
      <div className="card" style={{ backgroundColor: 'white', width: '70%', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
        <div className="card-body" style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelect}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendario;

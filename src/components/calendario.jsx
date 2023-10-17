// Este es el componente Calendario que muestra el calendario y los eventos del día seleccionado
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link } from 'react-router-dom';

function Calendario({eventos, setEventos}) {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  // Esta función devuelve el número de eventos que hay en una fecha dada
  const contarEventos = fecha => {
    return eventos.filter(evento => evento.fechaInicio.toDateString() === fecha.toDateString()).length;
  };

  // Esta función devuelve un array con los eventos que hay en una fecha dada
  const mostrarEventos = fecha => {
    return eventos.filter(evento => evento.fechaInicio.toDateString() === fecha.toDateString());
  };

  // Esta función devuelve un elemento JSX que muestra el número de eventos en una fecha del calendario
  const renderTileContent = ({ date }) => {
    const numEventos = contarEventos(date);
    if (numEventos > 0) {
      return (
        <div className="tile-content">
          <span>{numEventos}</span>
        </div>
      );
    }
    return null;
  };

  // Esta función devuelve un elemento JSX que muestra los detalles de los eventos en una fecha seleccionada
  const renderSelectedDateContent = () => {
    const eventosDelDia = mostrarEventos(date);
    if (eventosDelDia.length > 0) {
      return (
        <div className="selected-date-content">
          <h2>Eventos del día {date.toLocaleDateString()}</h2>
          <ul>
            {eventosDelDia.map((evento, index) => (
              <li key={index}>
                <h3>{evento.nombre}</h3>
                <p>Fecha: {evento.fechaInicio.toLocaleDateString()} - {evento.fechaTermino.toLocaleDateString()}</p>
                <p>Hora: {evento.horaInicio} - {evento.horaTermino}</p>
                <p>Modalidad: {evento.modalidad}</p>
                <p>Ubicación: {evento.modalidad === 'online' ? <a href={evento.ubicacion}>{evento.ubicacion}</a> : evento.ubicacion}</p>
                <Link to={`/eventos/${index}`}>Más información</Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="selected-date-content">
        <h2>No hay eventos programados para este día</h2>
      </div>
    );
  };

  return (
    <div className="Calendario">
      <button onClick={() => setFormularioVisible(true)}>Añadir evento</button>
      <Calendar
        onChange={onChange}
        value={date}
        tileContent={renderTileContent}
      />
      {renderSelectedDateContent()}
    </div>
  );
}

export default Calendario;

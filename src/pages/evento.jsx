// Este es el componente Evento que muestra la página de un evento con su información
import React from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/nav_bar';
import { Compartir } from '../components/compartir_evento';

function Evento({eventos}) {
  // Obtiene el índice del evento desde el parámetro de la ruta
  const { index } = useParams();
  // Obtiene el evento desde la lista de eventos
  const evento = eventos[index];

  return (
    <div className='page'>

      <div className="Evento">
        <NavBar />
        <h1>{evento.nombre}</h1>
        <p>Fecha: {evento.fechaInicio.slice(0,10)} - {evento.fechaTermino.slice(0,10)}</p>
        <p>Hora: {evento.horaInicio} - {evento.horaTermino}</p>
        <p>Modalidad: {evento.modalidad}</p>
        <p>Ubicación: {evento.modalidad === 'online' ? <a href={evento.ubicacion}>{evento.ubicacion}</a> : evento.ubicacion}</p>
        <p>Descripción: {evento.descripcion}</p>
        <Compartir />
      </div>
    </div>
  );
}

export default Evento;

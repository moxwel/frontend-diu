import React, { useState } from 'react';

function ListaEventos() {
  const [eventos, setEventos] = useState([]);

  const agregarEvento = () => {
    // Puedes cambiar esta función para obtener el nombre del evento de otra forma
    const nombre = prompt('Ingrese el nombre del evento');
    if (nombre) {
      // Añade el nuevo evento al final de la lista
      setEventos([...eventos, nombre]);
    }
  };

  return (
    <div className="ListaEventos">
      <h1>Lista de eventos</h1>
      <ul>
        {eventos.map((evento, index) => (
          <li key={index}>{evento}</li>
        ))}
      </ul>
      <button onClick={agregarEvento}>Agregar evento</button>
    </div>
  );
}

export default ListaEventos;

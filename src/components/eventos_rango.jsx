import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

function EventosRango({ eventos }) {
  const [date, setDate] = useState(new Date());
  const [rango, setRango] = useState([null, null]);
  const [dias, setDias] = useState(7);

  useEffect(() => {
    const hoy = date;
    const fin = new Date(date);
    fin.setDate(hoy.getDate() + dias);
    setRango([hoy, fin]);
  }, [dias]);

  const cambiarDias = (event) => {
    setDias(Number(event.target.value));
  };

  const filtrarEventos = () => {
    if (rango[0] && rango[1]) {
      const inicio = new Date(rango[0]).getTime();
      const fin = new Date(rango[1]).getTime();
      const eventosFiltrados = eventos.filter((evento) => {
        const fechaInicio = new Date(evento.dateInicio).getTime();
        return fechaInicio >= inicio && fechaInicio <= fin;
      });

      const eventosAgrupados = eventosFiltrados.reduce((grupos, evento) => {
        const fecha = new Date(evento.dateInicio).toDateString();
        if (!grupos[fecha]) {
          grupos[fecha] = [];
        }
        grupos[fecha].push(evento);
        return grupos;
      }, {});

      return Object.values(eventosAgrupados);
    }
    return [];
  };

  const renderEventos = () => {
    const gruposEventos = filtrarEventos();
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="dias">Selecciona la cantidad de días:</label>
            <select id="dias" value={dias} onChange={cambiarDias}>
              <option value="7">7</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
        {gruposEventos.map((grupo, index) => (
          <div className="row" key={index}>
            {grupo.map((evento, i) => (
              <div className="col-md-4" key={i}>
                <h3>{evento.nombre}</h3>
                <p>Fecha de inicio: {evento.dateInicio ? new Date(evento.dateInicio).toLocaleDateString() : "N/A"}</p>
                <p>Fecha de término: {evento.dateTermino ? new Date(evento.dateTermino).toLocaleDateString() : "N/A"}</p>
                <p>Hora de inicio: {evento.horaInicio}</p>
                <p>Hora de término: {evento.horaTermino}</p>
                <p>Modalidad: {evento.modalidad}</p>
                <p>Ubicación: {evento.ubicacion}</p>
                <p>Descripción: {evento.descripcion}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderEventos()}</div>;
}

export default EventosRango;

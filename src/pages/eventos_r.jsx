// Este es el componente HomePage modificado
import React from "react";
import PageHeader from "../components/page_header";
import EventosRango from "../components/eventos_rango";

export const EventosRangos = ({ eventos, setEventos }) => {
  // Recibe el estado eventos y la función setEventos como props
  return (
    <div className="page">
      <PageHeader />
      {/* Renderiza el componente Calendario y le pasa el estado eventos como prop */}
      <EventosRango eventos={eventos} setEventos={setEventos} />
    </div>
  );
};

export default EventosRangos;

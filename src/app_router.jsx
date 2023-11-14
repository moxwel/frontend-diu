// Este es el componente AppRouter que usa los tres componentes anteriores y los conecta
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import InternalPage from "./pages/internal";
import Formulario from "./pages/formulario";
import Evento from "./pages/evento";
import EditarEvento from "./pages/editar_evento";
import EventosRangos from "./pages/eventos_r";
import VerEvento from "./pages/ver_evento";

const AppRouter = () => {
  // Define el estado para la lista de eventos
  const [eventos, setEventos] = useState(() => {
    console.log("[AppRouter/state] Verificando localStorage...");
    const eventosGuardados = localStorage.getItem("eventos");
    if (eventosGuardados) {
      console.log("[AppRouter/state] Encontrado datos en localStorage. Cargando lista de eventos...");
      var retorno = JSON.parse(eventosGuardados);
    } else {
      console.log("[AppRouter/state] No hay datos en localStorage. Creando lista vacia: []");
      var retorno = [];
    }
    console.log("[AppRouter/state] listaEventos: ", retorno);
    return retorno;
  });

  // Guarda el estado eventos en el localStorage
  useEffect(() => {
    localStorage.setItem("eventos", JSON.stringify(eventos));
  }, [eventos]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage eventos={eventos} setEventos={setEventos} />} /> // Pasa el estado eventos y la función setEventos al componente HomePage
        <Route path="/internal" element={<InternalPage />} />
        <Route path="/formulario/:fechaSelec" element={<Formulario eventos={eventos} setEventos={setEventos} />} /> // Pasa el estado eventos y la función setEventos al componente Formulario
        <Route path="/formulario" element={<Formulario eventos={eventos} setEventos={setEventos} />} /> // Pasa el estado eventos y la función setEventos al componente Formulario
        <Route path="/eventos/:index" element={<Evento eventos={eventos} setEventos={setEventos} />} /> // Pasa el estado eventos al componente Evento
        <Route path="/eventos/editar/:index" element={<EditarEvento eventos={eventos} setEventos={setEventos} />} />
        <Route path="eventos/proximos" element={<EventosRangos eventos={eventos} setEventos={setEventos} />} /> // Pasa el estado eventos al componente EventosRango
        <Route path="/eventos/proximos/:index" element={<VerEvento eventos={eventos} setEventos={setEventos} />} /> // Pasa el estado eventos al componente VerEvento
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

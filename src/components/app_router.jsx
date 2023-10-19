// Este es el componente AppRouter que usa los tres componentes anteriores y los conecta
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home'
import InternalPage from '../pages/internal'
import Calendario from './calendario';
import Formulario from './formulario';
import Evento from './evento';

const AppRouter = () => {
  // Define el estado para la lista de eventos
  const [eventos, setEventos] = useState(() => {
    const eventosGuardados = localStorage.getItem('eventos');
    if (eventosGuardados) {
      return JSON.parse(eventosGuardados);
    } else {
      return [];
    }
  });

  console.log(eventos);

  // Guarda el estado eventos en el localStorage
  useEffect(() => {
    localStorage.setItem('eventos', JSON.stringify(eventos));
  }, [eventos]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage eventos={eventos} setEventos={setEventos} />} /> // Pasa el estado eventos y la función setEventos al componente HomePage
        <Route path='/internal' element={<InternalPage/>} />
        <Route path='/formulario' element={<Formulario eventos={eventos} setEventos={setEventos} />} /> // Pasa el estado eventos y la función setEventos al componente Formulario
        <Route path='/eventos/:index' element={<Evento eventos={eventos} />} /> // Pasa el estado eventos al componente Evento
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;

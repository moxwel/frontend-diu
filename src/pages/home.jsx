// Este es el componente HomePage modificado
import React from 'react';
import NavBar from '../components/nav_bar';
import Calendario from '../components/calendario';

export const HomePage = ({eventos, setEventos}) => {
  // Recibe el estado eventos y la función setEventos como props
  return (
    <div className='page'>
      <h1 className='page__title'>Eventos USM</h1>
      <NavBar />
      {/* Renderiza el componente Calendario y le pasa el estado eventos como prop */}
      <Calendario eventos={eventos} />
    </div>
  )
}

export default HomePage;

import React from 'react';

// Importa los componentes que se usaran
import NavBar from '../components/nav_bar';
import Calendario from '../components/calendario';

export const HomePage = ({eventos, setEventos}) => {
  // Recibe la variable de estado 'eventos' y la función 'setEventos' como props

  // Definicion del componente
  return (
    <div className='page'>
      <h1 className='page__title'>Frontend Sample App</h1>
      <NavBar />
      <h2>Página de Inicio</h2>
      <Calendario eventos={eventos} />
    </div>
  )
}

export default HomePage;

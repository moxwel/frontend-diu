// Este es el componente HomePage modificado
import React from 'react';

import PageHeader from '../components/page_header';
import Calendario from '../components/calendario';

export const HomePage = ({eventos, setEventos}) => {
  // Recibe el estado eventos y la función setEventos como props
  return (
    <div className='page'>
      <PageHeader />
      {/* Renderiza el componente Calendario y le pasa el estado eventos como prop */}
      <Calendario eventos={eventos} />
    </div>
  )
}

export default HomePage;

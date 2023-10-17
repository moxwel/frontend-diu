// Este es el componente HomePage modificado
import React, { useState } from 'react';
import NavBar from '../components/nav_bar';
import Calendario from '../components/calendario';
import Formulario from '../components/formulario';

export const HomePage = () => {
  // Define el estado para la lista de eventos
  const [eventos, setEventos] = useState([]);
  // Define el estado para la visibilidad del formulario
  const [formularioVisible, setFormularioVisible] = useState(false);

  return (
    <div className='page'>
      <h1 className='page__title'>Frontend Sample App</h1>
      <NavBar />
      <h2>Página de Inicio</h2>
      {/* Renderiza el componente Calendario y le pasa los estados como props */}
      <Calendario eventos={eventos} setEventos={setEventos} setFormularioVisible={setFormularioVisible} />
      {/* Renderiza el componente Formulario si el estado formularioVisible es verdadero */}
      {formularioVisible && <Formulario eventos={eventos} setEventos={setEventos} setFormularioVisible={setFormularioVisible} />}
    </div>
  )
}

export default HomePage;


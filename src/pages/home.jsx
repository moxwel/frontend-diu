import React from 'react'

import NavBar from '../components/nav_bar'
import MyCalendar from '../components/calendar' 
import ListaEventos from '../components/lista_eventos'
import { Compartir } from '../components/compartir_evento' // Cambio aquí



export const HomePage = () => {
  const eventUrl = "localhost:5050"; // la url del evento
  return (
    <div className='page'>
      <h1 className='page__title'>Frontend Sample App</h1>
      <NavBar />
      <MyCalendar />
      <ListaEventos />
      <Compartir url={eventUrl} /> 
      <h2>Página de Inicio</h2>
    </div>
  )
}

export default HomePage

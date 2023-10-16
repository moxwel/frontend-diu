import React from 'react'

import NavBar from '../components/nav_bar'
import MyCalendar from '../components/calendar' 
import ListaEventos from '../components/lista_eventos'

export const HomePage = () => {
  return (
    <div className='page'>
      <h1 className='page__title'>Frontend Sample App</h1>
      <NavBar />
      <MyCalendar />
      <ListaEventos />
      <h2>Página de Inicio</h2>
    </div>
  )
}

export default HomePage

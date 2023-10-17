// Este es el componente AppRouter modificado
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home'
import InternalPage from '../pages/internal'
import Evento from './evento'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/internal' element={<InternalPage/>} />
        <Route path='/eventos/:index' element={<Evento/>} /> // Una ruta con un parámetro llamado 'index'
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

/*
AppRouter: Componente que define las rutas de la aplicación. Observa la URL y dependiendo de eso
muestra un componente u otro.
*/
import React from 'react'

/*
useState: Hook que permite agregar estado a un componente funcional. Recibe un valor inicial
y retorna un arreglo con dos elementos: el valor actual de la variable y una función para actualizar la variable.

*Hook: 'Ganchos' en español, son funciones que permiten agregar funcionalidad a los componentes
funcionales (los creados con funciones y no con clases). Siempre comienzan con 'use', como 'useState',
'useEffect', 'useContext', etc. Estas funciones se llaman dentro del componente funcional.

*Estado: Es un objeto que contiene información que puede cambiar durante la ejecución de la aplicación.
Se definen con la función 'useState' y se acceden con la variable que retorna esa función.
Cada objeto de estado es local de un componente, es decir, no se puede acceder a él desde otro componente.
Para eso se debe pasar como prop.

*Prop: Son variables que se pasan a un componente. Se pasan como atributos en el componente. Una analogía
es que los componentes son como funciones, y las props son los parámetros que se le pasan a la función.
*/
import { useState } from 'react';

/*
BrowserRouter: Da el funcionamiento del ruteo a la aplicación. Este escucha los cambios en la URL
y muestra el componente que corresponda.

Routes: Contiene una lista de rutas (componente Route).

Route: Define una ruta de la aplicación. Tiene un 'path' y un 'element'. El 'path' es la URL que debe
tener el navehador para que se muestre el 'element'. El 'element' es el componente que se debe mostrar cuando la
URL coincida con el 'path'.
*/
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importa los componentes que se deben mostrar en cada ruta
import HomePage from '../pages/home'
import Formulario from './formulario';
import Evento from './evento';
import InternalPage from '../pages/internal'

// Definicion del componente 'AppRouter'
const AppRouter = () => {

  // Define la variable de estado 'eventos' y la función 'setEventos' para actualizarla
  const [eventos, setEventos] = useState([]);

  // Definicion del componente
  /*
  Rutas:

  - /: Ruta de la página de inicio.
    Muestra el componente 'HomePage' y se le pasa la variable 'eventos' y la función 'setEventos' como props.
    
  - /formulario: Ruta del formulario para crear un evento.
    Muestra el componente 'Formulario' y se le pasa la variable 'eventos' y la función 'setEventos' como props.

  - /eventos/:index: Ruta de la página de un evento.
    Muestra el componente 'Evento' y se le pasa la variable 'eventos' como props.
    ':index' es un parámetro de la ruta. Se obtiene con el hook 'useParams'.

  - /internal: Ruta de la página interna.
    Muestra el componente 'InternalPage'.
  */
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'               element={<HomePage   eventos={eventos} setEventos={setEventos} />} /> 
        <Route path='/formulario'     element={<Formulario eventos={eventos} setEventos={setEventos} />} />
        <Route path='/eventos/:index' element={<Evento     eventos={eventos} />} />
        <Route path='/internal'       element={<InternalPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;

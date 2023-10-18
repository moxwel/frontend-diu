// Este es el archivo principal de la aplicación, es el punto de entrada cuando el navegador
// carga la pagina web.

/*
React: es una librería de JavaScript para crear interfaces de usuario.

ReactDom: es una librería de JavaScript para renderizar componentes de React en el DOM.

*DOM: es una interfaz de programación de aplicaciones (API) para documentos HTML y XML. JavaScript
puede acceder y modificar el HTML de la pagina web con las funciones que provee el DOM.
Funciones como 'document.createElement' y 'document.getElementById' son funciones del DOM.
*/
import React from 'react';
import ReactDom from 'react-dom';

// Importar el componente 'AppRouter' desde el archivo 'src/components/app_router.jsx'
import AppRouter from './components/app_router';

// Importar los estilos de la aplicación
// Estos estilos se aplican a todos los componentes de la aplicación
import './stylesheets/index.scss';

// Poner un 'div' con id 'root' en el 'body' del HTML de la pagina web
const root = document.createElement('div');
root.setAttribute('id', 'root');
document.body.appendChild(root);

// Renderizar el componente de React 'AppRouter' en el 'div' con id 'root'
ReactDom.render(<AppRouter />, document.getElementById('root'));

// El componente 'AppRouter' es el componente principal de la aplicación, se encuentra
// en el archivo 'src/components/app_router.jsx'.

// Como convencion, los nombres de los componentes de React siempre empiezan con mayuscula.

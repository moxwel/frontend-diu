// Este es el componente Formulario que muestra el formulario para agregar un evento
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, FormGroup, Label, Input, Nav } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from './nav_bar';
import { Button, Box } from '@mui/material';

function Formulario({eventos, setEventos}) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    fechaInicio: new Date().toISOString(),
    fechaTermino: new Date().toISOString(),
    horaInicio: '',
    horaTermino: '',
    modalidad: '',
    ubicacion: '',
    descripcion: ''
  });

  // Usa el hook useHistory para acceder al historial de navegación
  const navigate = useNavigate();

  const agregarEvento = e => {
    e.preventDefault();
    // Añade el nuevo evento al final de la lista
    setEventos([...eventos, formulario]);
    // Limpia el formulario
    setFormulario({
      nombre: '',
      fechaInicio: new Date().toISOString(),
      fechaTermino: new Date().toISOString(),
      horaInicio: '',
      horaTermino: '',
      modalidad: '',
      ubicacion: '',
      descripcion: ''
    });
    // Vuelve a la ruta /
    navigate('/');
  };

  // Esta función maneja el cambio de los valores del formulario
  const handleChange = e => {
    const {name, value} = e.target;
    setFormulario({...formulario, [name]: value});
  };

  // Esta función cancela el formulario y vuelve a la ruta /
  const cancelarFormulario = () => {
    navigate('/');
  };

  return (
    <div className="page">
    <div className="Formulario">
      <h1 className="page_title">Agregar evento</h1>
      <NavBar />
      <Form onSubmit={agregarEvento}>
        <FormGroup>
          <Label for="nombre">Nombre:</Label>
          <Input type="text" name="nombre" id="nombre" value={formulario.nombre} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="fechaInicio">Fecha de inicio:</Label>
          <DatePicker selected={Date.parse(formulario.fechaInicio)} onChange={date => setFormulario({...formulario, fechaInicio: date.toISOString()})} dateFormat="dd/MM/yyyy" id="fechaInicio" />
        </FormGroup>
        <FormGroup>
          <Label for="fechaTermino">Fecha de término:</Label>
          <DatePicker selected={Date.parse(formulario.fechaTermino)} onChange={date => setFormulario({...formulario, fechaTermino: date.toISOString()})} dateFormat="dd/MM/yyyy" id="fechaTermino" />
        </FormGroup>
        <FormGroup>
          <Label for="horaInicio">Hora de inicio:</Label>
          <Input type="time" name="horaInicio" id="horaInicio" value={formulario.horaInicio} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="horaTermino">Hora de término:</Label>
          <Input type="time" name="horaTermino" id="horaTermino" value={formulario.horaTermino} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="modalidad">Modalidad:</Label>
          <Input type="select" name="modalidad" id="modalidad" value={formulario.modalidad} onChange={handleChange} required>
            <option value="">Seleccione una opción</option>
            <option value="online">Online</option>
            <option value="presencial">Presencial</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="ubicacion">Ubicación:</Label>
          {formulario.modalidad === 'online' ? (
            <Input type="url" name="ubicacion" id="ubicacion" value={formulario.ubicacion} onChange={handleChange} placeholder="Ingrese el enlace del evento" required />
          ) : (
            <Input type="text" name="ubicacion" id="ubicacion" value={formulario.ubicacion} onChange={handleChange} placeholder="Ingrese la dirección del evento" required />
          )}
        </FormGroup>
        <FormGroup>
          <Label for="descripcion">Descripción:</Label>
          <Input type="textarea" name="descripcion" id="descripcion" value={formulario.descripcion} onChange={handleChange} required />
        </FormGroup>
        {/* Agrega dos botones para enviar o cancelar el formulario */}
        <Button variant="contained" type="submit">✔ Enviar</Button>
        <Button variant="contained" onClick={cancelarFormulario}>❌ Cancelar</Button>
      </Form>
    </div>
    </div> 

  );
}

export default Formulario;

// Este es el componente Evento que muestra la página de un evento con su información
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Nav } from "reactstrap";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/page_header";
import { Button, Box } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";

function EditarEvento({ eventos, setEventos }) {
  const { index } = useParams();
  const evento = eventos[index];

  const navigate = useNavigate();

  //crear formulario que muestre los valores actuales del evento para poder editarlos

  const [formulario, setFormulario] = useState({
    nombre: evento.nombre,
    fechaInicio: evento.fechaInicio,
    fechaTermino: evento.fechaTermino,
    horaInicio: evento.horaInicio,
    horaTermino: evento.horaTermino,
    modalidad: evento.modalidad,
    ubicacion: evento.ubicacion,
    descripcion: evento.descripcion,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const cancelarEdicion = () => {
    navigate("/eventos/" + index);
  };

  const guardarEdicion = (e) => {
    e.preventDefault();
    //edita el elemento en la lista
    eventos[index] = formulario;
    // Actualiza el estado del componente con la lista de eventos actualizada
    setEventos(eventos);
    // Actualiza el almacenamiento local con la lista de eventos actualizada
    localStorage.setItem("eventos", JSON.stringify(eventos));
    // Limpia el formulario
    setFormulario({
      nombre: "",
      fechaInicio: new Date().toISOString(),
      fechaTermino: new Date().toISOString(),
      horaInicio: "",
      horaTermino: "",
      modalidad: "",
      ubicacion: "",
      descripcion: "",
    });
    // Vuelve a la ruta /
    navigate("/eventos/" + index);
  };

  return (
    <div className="page">
      <PageHeader />
      <div className="Formulario">
        <h2>Editar Evento {evento.nombre}</h2>
        <Form onSubmit={guardarEdicion}>
          <FormGroup>
            <Label for="nombre">Nombre:</Label>
            <Input type="text" name="nombre" id="nombre" value={formulario.nombre} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="fechaInicio">Fecha de inicio:</Label>
            <DatePicker selected={Date.parse(formulario.fechaInicio)} onChange={(date) => setFormulario({ ...formulario, fechaInicio: date.toISOString() })} dateFormat="dd/MM/yyyy" id="fechaInicio" />
          </FormGroup>
          <FormGroup>
            <Label for="fechaTermino">Fecha de término:</Label>
            <DatePicker selected={Date.parse(formulario.fechaTermino)} onChange={(date) => setFormulario({ ...formulario, fechaTermino: date.toISOString() })} dateFormat="dd/MM/yyyy" id="fechaTermino" />
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
            {formulario.modalidad === "online" ? <Input type="url" name="ubicacion" id="ubicacion" value={formulario.ubicacion} onChange={handleChange} placeholder="Ingrese el enlace del evento" required /> : <Input type="text" name="ubicacion" id="ubicacion" value={formulario.ubicacion} onChange={handleChange} placeholder="Ingrese la dirección del evento" required />}
          </FormGroup>
          <FormGroup>
            <Label for="descripcion">Descripción:</Label>
            <Input type="textarea" name="descripcion" id="descripcion" value={formulario.descripcion} onChange={handleChange} required />
          </FormGroup>
          {/* Agrega dos botones para enviar o cancelar el formulario */}
          <Button variant="contained" type="submit" startIcon={<EventAvailableIcon />}>
            Crear
          </Button>
          <Button variant="contained" color="error" onClick={cancelarEdicion} startIcon={<CancelIcon />}>
            Cancelar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default EditarEvento;

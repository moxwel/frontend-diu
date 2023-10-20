// Este es el componente Formulario que muestra el formulario para agregar un evento
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Nav } from "reactstrap";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/page_header";
import { Button, Box } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";

function Formulario({ eventos, setEventos }) {
  const [formulario, setFormulario] = useState({
    nombre: "",
    dateInicio: new Date(),
    dateTermino: new Date(),
    fechaInicio: new Date().toLocaleDateString(),
    fechaTermino: new Date().toLocaleDateString(),
    horaInicio: new Date().toLocaleTimeString().slice(0, 5),
    horaTermino: new Date().toLocaleTimeString().slice(0, 5),
    modalidad: "",
    ubicacion: "",
    descripcion: "",
  });

  // Usa el hook useHistory para acceder al historial de navegación
  const navigate = useNavigate();

  const agregarEvento = (e) => {
    e.preventDefault();
    // Añade el nuevo evento al final de la lista
    setEventos([...eventos, formulario]);
    // Limpia el formulario
    setFormulario({
      nombre: "",
      dateInicio: new Date(),
      dateTermino: new Date(),
      fechaInicio: new Date().toLocaleDateString(),
      fechaTermino: new Date().toLocaleDateString(),
      horaInicio: new Date().toLocaleTimeString().slice(0, 5),
      horaTermino: new Date().toLocaleTimeString().slice(0, 5),
      modalidad: "",
      ubicacion: "",
      descripcion: "",
    });
    // Vuelve a la ruta /
    navigate("/");
  };

  // Esta función maneja el cambio de los valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
    console.log(formulario);
  };

  // Esta función cancela el formulario y vuelve a la ruta /
  const cancelarFormulario = () => {
    navigate("/");
  };

  return (
    <div className="page">
      <PageHeader />
      <div className="Formulario">
        <h2>Agregar evento</h2>
        <Form onSubmit={agregarEvento}>
          <FormGroup>
            <Label for="nombre">Nombre:</Label>
            <Input type="text" name="nombre" id="nombre" value={formulario.nombre} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="fechaInicio">Fecha de inicio:</Label>
            <DatePicker
              selected={formulario.dateInicio}
              onChange={(date) => {
                setFormulario({
                  ...formulario,
                  dateInicio: date,
                  fechaInicio: date.toLocaleDateString(),
                  horaInicio: date.toLocaleTimeString().slice(0, 5),
                });
              }}
              dateFormat="dd/MM/yyyy"
              id="fechaInicio"
            />
          </FormGroup>
          <FormGroup>
            <Label for="fechaTermino">Fecha de término:</Label>
            <DatePicker
              selected={formulario.dateTermino}
              onChange={(date) => {
                setFormulario({
                  ...formulario,
                  dateTermino: date,
                  fechaTermino: date.toLocaleDateString(),
                  horaTermino: date.toLocaleTimeString().slice(0, 5),
                });
              }}
              dateFormat="dd/MM/yyyy"
              id="fechaTermino"
            />
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
          <Button variant="contained" color="error" onClick={cancelarFormulario} startIcon={<CancelIcon />}>
            Cancelar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Formulario;

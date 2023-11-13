// Este es el componente Evento que muestra la página de un evento con su información
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Nav } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/page_header";
import { Button, Box, Grid } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
      fechaInicio: new Date().toLocaleDateString(),
      fechaTermino: new Date().toLocaleDateString(),
      horaInicio: new Date().toLocaleTimeString().slice(0, 5),
      horaTermino: new Date().toLocaleTimeString().slice(0, 5),
      modalidad: "",
      ubicacion: "",
      descripcion: "",
    });
    // Vuelve a la ruta /
    navigate("/eventos/" + index);
  };

  // Esta función cancela el formulario y vuelve a la ruta /
  const cancelarFormulario = () => {
    navigate("/");
  };

  const volver = () => {
    navigate("/");
  };

  return (
    <div className="page">
      <PageHeader />
      <Grid container direction="row">
        <Grid item xs={3}>
          <p>
            <Button variant="contained" color="info" onClick={volver} startIcon={<ArrowBackIcon />}>
              Volver
            </Button>
          </p>
        </Grid>
        <Grid item xs={6}>
          <div className="FormularioContenedor">
            <h2>Agregar evento</h2>
            <Form onSubmit={guardarEdicion}>
              <FormGroup>
                <Label for="nombre">Nombre:</Label>
                <Input type="text" name="nombre" id="nombre" value={formulario.nombre} onChange={handleChange} required />
              </FormGroup>
              <Grid container>
                <Grid item sm={12} md={6}>
                  <FormGroup>
                    <Label for="fechaInicio">Fecha de inicio:</Label>
                    <Input type="date" name="fechaInicio" id="fechaInicio" value={formulario.fechaInicio} onChange={handleChange} required />
                  </FormGroup>
                </Grid>

                <Grid item sm={12} md={6}>
                  <FormGroup>
                    <Label for="fechaTermino">Fecha de término:</Label>
                    <Input type="date" name="fechaTermino" id="fechaTermino" value={formulario.fechaTermino} onChange={handleChange} required />
                  </FormGroup>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item sm={12} md={6}>
                  <FormGroup>
                    <Label for="horaInicio">Hora de inicio:</Label>
                    <Input type="time" name="horaInicio" id="horaInicio" value={formulario.horaInicio} onChange={handleChange} required />
                  </FormGroup>
                </Grid>
                <Grid item sm={12} md={6}>
                  <FormGroup>
                    <Label for="horaTermino">Hora de término:</Label>
                    <Input type="time" name="horaTermino" id="horaTermino" value={formulario.horaTermino} onChange={handleChange} required />
                  </FormGroup>
                </Grid>
              </Grid>

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
        </Grid>
      </Grid>
    </div>
  );
}

export default EditarEvento;

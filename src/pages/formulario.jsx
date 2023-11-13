// Este es el componente Formulario que muestra el formulario para agregar un evento
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Form, FormGroup, Label, Input, Nav } from "reactstrap";

import { Button, Grid } from "@mui/material";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";

import PageHeader from "../components/page_header";

// Funcion que recibe una fecha y devuelve un objeto con la fecha y la hora formateadas
// Fecha en formato YYYY-MM-DD y hora en formato HH:MM
function formatearFecha(fecha) {
  var year = fecha.getFullYear();
  var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
  var day = ("0" + fecha.getDate()).slice(-2);
  var hours = ("0" + fecha.getHours()).slice(-2);
  var minutes = ("0" + fecha.getMinutes()).slice(-2);

  var formattedDate = year + "-" + month + "-" + day;
  var formattedTime = hours + ":" + minutes;

  return { formattedDate, formattedTime };
}

function Formulario({ eventos, setEventos }) {
  // Se recibe la fecha seleccionada como parámetro en la URL, viene en formato ISO
  var { fechaSelec } = useParams();

  const [formulario, setFormulario] = useState(() => {
    if (!fechaSelec) {
      console.log("[Formulario] No hay fecha seleccionada. Usando fecha actual...");
      fechaSelec = new Date();
    } else {
      // Convierte la fecha de ISO a Date
      fechaSelec = new Date(fechaSelec);
    }

    console.log("[Formulario] fechaSelec: " + fechaSelec);

    var { formattedDate, formattedTime } = formatearFecha(fechaSelec);

    console.log("[Formulario] formattedDate: " + formattedDate + " , formattedTime: " + formattedTime);

    return {
      nombre: "",
      fechaInicio: formattedDate,
      fechaTermino: formattedDate,
      horaInicio: formattedTime,
      horaTermino: formattedTime,
      modalidad: "",
      ubicacion: "",
      descripcion: "",
    };
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
      fechaInicio: new Date(),
      fechaTermino: new Date(),
      horaInicio: new Date(),
      horaTermino: new Date(),
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
            <Form onSubmit={agregarEvento}>
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

export default Formulario;

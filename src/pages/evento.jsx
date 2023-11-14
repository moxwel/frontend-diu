// Este es el componente Evento que muestra la página de un evento con su información
import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Compartir } from "../components/compartir_evento";
import PageHeader from "../components/page_header";
import { Grid, Box } from "@mui/material";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";

// Funcion que recibe una fecha y devuelve un string con la fecha formateada.
// Fecha en formato DD/MM/YYYY
function formatoFechaChile(fecha) {
  var fechaActual = new Date(fecha + "T00:00:00");
  var year = fechaActual.getFullYear();
  var month = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  var day = ("0" + fechaActual.getDate()).slice(-2);

  return day + "/" + month + "/" + year;
}

function Evento({ eventos, setEventos }) {
  // Obtiene el índice del evento desde el parámetro de la ruta
  const { index } = useParams();
  // Obtiene el evento desde la lista de eventos
  const evento = eventos[index];

  const navigate = useNavigate();

  const eliminarEvento = () => {
    // Obtiene la lista de eventos del almacenamiento local
    const eventosGuardados = JSON.parse(localStorage.getItem("eventos"));
    // Elimina el evento de la lista de eventos
    eventosGuardados.splice(index, 1);
    // Actualiza el estado del componente con la lista de eventos actualizada
    setEventos(eventosGuardados);
    // Actualiza el almacenamiento local con la lista de eventos actualizada
    localStorage.setItem("eventos", JSON.stringify(eventosGuardados));
    // Vuelve a la ruta /
    navigate("/");
  };

  const editarEvento = () => {
    navigate("/eventos/editar/" + index);
  };

  const volver = () => {
    navigate("/");
  };

  const notificar = () => {
    //muestra ventana que dice correos enviados con éxito
    alert("Correos enviados con éxito");
  };

  return (
    <div className="page">
      <PageHeader />

      <Grid container direction="row">
        <Grid item xs={4}>
          <h2>Administrar</h2>
          <p>
            <Button variant="contained" color="info" onClick={volver} startIcon={<ArrowBackIcon />}>
              Volver
            </Button>
          </p>
          <p>
            <Button variant="contained" color="warning" onClick={editarEvento} startIcon={<EventRepeatIcon />}>
              Editar Evento
            </Button>
          </p>
          <p>
            <Button variant="contained" color="error" onClick={eliminarEvento} startIcon={<DeleteIcon />}>
              Eliminar evento
            </Button>
          </p>
          <p>
            <Button variant="contained" color="info" onClick={notificar} startIcon={<EmailIcon />}>
              Notificar por correo
            </Button>
          </p>
        </Grid>
        <Grid item xs={8}>
          <div className="Evento">
            <h2>{evento.nombre}</h2>
            <p>
              Fecha: {formatoFechaChile(evento.fechaInicio)} - {formatoFechaChile(evento.fechaTermino)}
            </p>
            <p>
              Hora: {evento.horaInicio} - {evento.horaTermino}
            </p>
            <p>Modalidad: {evento.modalidad}</p>
            <p>Ubicación: {evento.modalidad === "online" ? <a href={evento.ubicacion}>{evento.ubicacion}</a> : evento.ubicacion}</p>
            <p>Descripción: {evento.descripcion}</p>
            <Box border={1} borderColor="primary.main" borderRadius={16} padding={1} marginY={2} textAlign="center">
              Asistentes: {evento.asistentes}
            </Box>
            <Compartir />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Evento;

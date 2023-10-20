// Este es el componente Evento que muestra la página de un evento con su información
import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Compartir } from "../components/compartir_evento";
import PageHeader from "../components/page_header";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  return (
    <div className="page">
      <PageHeader />

      <Grid container direction="row">
        <Grid item xs={6}>
          <div className="Evento">
            <h2>{evento.nombre}</h2>
            <p>
              Fecha: {evento.fechaInicio} - {evento.fechaTermino}
            </p>
            <p>
              Hora: {evento.horaInicio} - {evento.horaTermino}
            </p>
            <p>Modalidad: {evento.modalidad}</p>
            <p>Ubicación: {evento.modalidad === "online" ? <a href={evento.ubicacion}>{evento.ubicacion}</a> : evento.ubicacion}</p>
            <p>Descripción: {evento.descripcion}</p>
            <Compartir />
          </div>
        </Grid>
        <Grid item xs={6} flexDirection={"column"}>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default Evento;

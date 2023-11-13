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
import EmailIcon from "@mui/icons-material/Email";

function VerEvento({ eventos, setEventos }) {
  // Obtiene el índice del evento desde el parámetro de la ruta
  const { index } = useParams();
  // Obtiene el evento desde la lista de eventos
  const evento = eventos[index];

  const navigate = useNavigate();

  const volver = () => {
    navigate("/");
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
        </Grid>
        <Grid item xs={8}>
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
      </Grid>
    </div>
  );
}

export default VerEvento;

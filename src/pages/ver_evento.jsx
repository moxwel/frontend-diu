import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Compartir } from "../components/compartir_evento";
import PageHeader from "../components/page_header";
import { Grid, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function VerEvento({ eventos, setEventos }) {
  const { index } = useParams();
  const evento = eventos[index];

  const navigate = useNavigate();

  const volver = () => {
    navigate("/eventos/proximos");
  };

  const confirmarAsistencia = () => {
    const nuevosEventos = [...eventos];
    nuevosEventos[index].asistentes += 1;
    setEventos(nuevosEventos);
  };

  return (
    <div className="page">
      <PageHeader />

      <Grid container direction="row">
        <Grid item xs={4}>
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
            <Box border={1} borderColor="primary.main" borderRadius={16} padding={1} marginY={2} textAlign="center">
              Asistentes: {evento.asistentes}
            </Box>
            <Button variant="contained" color="warning" onClick={confirmarAsistencia} startIcon={<EventAvailableIcon />}>
              Confirmar Asistencia
            </Button>
            <Compartir />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default VerEvento;

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

  return (
    <div className="page">
      <PageHeader />

      <Grid container direction="row">
        <Grid item xs={6}>
          <div className="Evento">
            <h2>{evento.nombre}</h2>
            <p>
              Fecha: {evento.fechaInicio.slice(0, 10)} - {evento.fechaTermino.slice(0, 10)}
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
        <Grid item xs={6}>
          <h2>Administrar</h2>
          <Button variant="contained" color="warning" onClick={editarEvento} startIcon={<EventRepeatIcon />}>
            Editar Evento
          </Button>
          {/* Cuando borra elementos, no los actualiza en el localstore, hay que arreglar eso */}
          <Button variant="contained" color="error" onClick={eliminarEvento} startIcon={<DeleteIcon />}>
            Eliminar evento
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Evento;

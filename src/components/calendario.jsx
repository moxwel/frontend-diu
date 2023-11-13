// Este es el componente Calendario que muestra el calendario y los eventos del día seleccionado
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

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

function Calendario({ eventos: lEventos }) {
  const [fechaSelec, setFecha] = useState(() => {
    console.log("[Calendario/state] Estableciendo fecha inicial...");
    var retorno = new Date();

    console.log("[Calendario/state] date: " + retorno);

    return retorno;
  });

  const onChange = (date) => {
    // Tomar la fecha seleccionada pero usar la hora actual
    var nuevaFecha = new Date();
    nuevaFecha.setFullYear(date.getFullYear());
    nuevaFecha.setMonth(date.getMonth());
    nuevaFecha.setDate(date.getDate());
    nuevaFecha.setHours(new Date().getHours());
    nuevaFecha.setMinutes(new Date().getMinutes());

    console.log("[Calendario/onChange] date: " + nuevaFecha);
    setFecha(nuevaFecha);
  };

  // Esta función devuelve el número de eventos que hay en una fecha dada
  const contarEventos = (fechaSel) => {
    var { formattedDate, formattedTime } = formatearFecha(fechaSel);

    return lEventos.filter((evento) => evento.fechaInicio === formattedDate).length;
  };

  // Esta función devuelve un array con los eventos que hay en una fecha dada
  const mostrarEventos = (fecha) => {
    var { formattedDate, formattedTime } = formatearFecha(fecha);

    return lEventos.filter((evento) => evento.fechaInicio === formattedDate);
  };

  // Esta función devuelve un elemento JSX que muestra el número de eventos en una fecha del calendario
  const renderTileContent = ({ date }) => {
    const numEventos = contarEventos(date);
    if (numEventos > 0) {
      return (
        <div className="tile-content">
          <span>{numEventos}</span>
        </div>
      );
    }
    return null;
  };

  // Esta función devuelve un elemento JSX que muestra los detalles de los eventos en una fecha seleccionada
  const renderSelectedDateContent = () => {
    const eventosDelDia = mostrarEventos(fechaSelec);
    if (eventosDelDia.length > 0) {
      return (
        <div className="selected-date-content">
          <h2>Eventos del día {fechaSelec.toLocaleDateString()}</h2>
          {eventosDelDia.map((evento, index) => (
            <Card sx={{ border: "1px solid #ccc", margin: "10px", minWidth: "300px" }}>
              <CardContent>
                <Typography sx={{ fontSize: 22, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                  {evento.nombre.toUpperCase()}
                </Typography>
                <div sx={{ textAlign: "center" }}>
                  <p>
                    Fecha: {evento.fechaInicio} - {evento.fechaTermino}
                  </p>
                  <p>
                    Hora: {evento.horaInicio} - {evento.horaTermino}
                  </p>
                  <p>Modalidad: {evento.modalidad}</p>
                  <p>Ubicación: {evento.modalidad === "online" ? <a href={evento.ubicacion}>{evento.ubicacion}</a> : evento.ubicacion}</p>
                </div>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/eventos/${index}`} variant="contained" startIcon={<VisibilityIcon />}>
                  Más Información
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      );
    }
    return (
      <div className="selected-date-content">
        <h2>No hay eventos programados para este día</h2>
      </div>
    );
  };

  return (
    <div className="Calendario">
      {/* Cambia el botón para añadir evento por un enlace a la ruta /formulario */}

      <Grid container direction="row">
        <Grid item xs={4}>
          <h1>Calendario</h1>
          <Button component={Link} to={`/formulario/${fechaSelec.toISOString()}`} variant="contained" color="warning" startIcon={<AddIcon />}>
            Añadir evento
          </Button>
          <p></p>
          <Calendar onChange={onChange} value={fechaSelec} tileContent={renderTileContent} />
        </Grid>
        <Grid item xs={8}>
          <h1>Eventos</h1>
          {renderSelectedDateContent()}
        </Grid>
      </Grid>
    </div>
  );
}

export default Calendario;

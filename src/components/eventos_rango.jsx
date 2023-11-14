import React, { useState, useEffect } from "react";
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

// Funcion que recibe una fecha y devuelve un string con la fecha formateada.
// Fecha en formato DD/MM/YYYY
function formatoFechaChile(fecha) {
  var fechaActual = new Date(fecha + "T00:00:00");
  var year = fechaActual.getFullYear();
  var month = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
  var day = ("0" + fechaActual.getDate()).slice(-2);

  return day + "/" + month + "/" + year;
}

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

function EventosRango({ eventos: lEventos }) {
  const [date, setDate] = useState(new Date());
  const [rango, setRango] = useState([null, null]);
  const [dias, setDias] = useState(7);

  useEffect(() => {
    const hoy = new Date(date);
    const fin = new Date(date);
    fin.setDate(hoy.getDate() + dias);
    setRango([hoy, fin]);
  }, [dias]);

  const cambiarDias = (event) => {
    setDias(Number(event.target.value));
  };

  const filtrarEventos = () => {
    if (rango[0] && rango[1]) {
      const inicio = new Date(rango[0]).getTime();
      const fin = new Date(rango[1]).getTime();

      console.log("[EventosRango/filtrarEventos] inicio: ", inicio + ", fin: ", fin);
      console.log("[EventosRango/filtrarEventos] lEventos: ", lEventos);

      var filtro = (evento) => {
        const fechaInicio = new Date(evento.fechaInicio).getTime();
        return fechaInicio >= inicio && fechaInicio <= fin;
      };

      const eventosFiltrados = lEventos.map((detalles, index) => ({ index, detalles })).filter(({ detalles }) => filtro(detalles));

      console.log("[EventosRango/filtrarEventos] eventosFiltrados: ", eventosFiltrados);

      return eventosFiltrados;
    }
    return [];
  };

  const renderEventos = () => {
    const eventosRango = filtrarEventos();
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-md-12">
            <label htmlFor="dias" style={{ marginRight: "10px" }}>
              Selecciona la cantidad de días:
            </label>
            <select id="dias" value={dias} onChange={cambiarDias} style={{ width: "200px", height: "30px", fontSize: "16px" }}>
              <option value="7">7</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
        {eventosRango.length === 0 ? (
          <p>No hay eventos próximos en el rango solicitado</p>
        ) : (
          <div className="row">
            {eventosRango.map(({ index, detalles }) => (
              <Card sx={{ border: "1px solid #ccc", margin: "10px", minWidth: "300px" }}>
                <CardContent>
                  <Typography sx={{ fontSize: 22, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                    {detalles.nombre.toUpperCase()}
                  </Typography>
                  <div sx={{ textAlign: "center" }}>
                    <p>
                      Fecha: {formatoFechaChile(detalles.fechaInicio)} - {formatoFechaChile(detalles.fechaTermino)}
                    </p>
                    <p>
                      Hora: {detalles.horaInicio} - {detalles.horaTermino}
                    </p>
                    <p>Modalidad: {detalles.modalidad}</p>
                    <p>Ubicación: {detalles.modalidad === "online" ? <a href={detalles.ubicacion}>{detalles.ubicacion}</a> : detalles.ubicacion}</p>
                  </div>
                </CardContent>
                <CardActions>
                  <Button component={Link} to={`/eventos/proximos/${index}`} variant="contained" startIcon={<VisibilityIcon />}>
                    Más Información
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return <div>{renderEventos()}</div>;
}

export default EventosRango;

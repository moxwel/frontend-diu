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

      const eventosFiltrados = lEventos.filter((evento) => {
        const fechaInicio = new Date(evento.fechaInicio).getTime();
        return fechaInicio >= inicio && fechaInicio <= fin;
      });

      console.log("[EventosRango/filtrarEventos] eventosFiltrados: ", eventosFiltrados);

      const eventosAgrupados = eventosFiltrados.reduce((grupos, evento) => {
        const fecha = new Date(evento.fechaInicio).toDateString();
        if (!grupos[fecha]) {
          grupos[fecha] = [];
        }
        grupos[fecha].push(evento);
        return grupos;
      }, {});

      return Object.values(eventosAgrupados);
    }
    return [];
  };

  const renderEventos = () => {
    const gruposEventos = filtrarEventos();
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
        {gruposEventos.length === 0 ? (
          <p>No hay eventos próximos en el rango solicitado</p>
        ) : (
          gruposEventos.map((grupo, index) => (
            <div className="row" key={index}>
              {grupo.map((evento, i) => (
                <Card sx={{ border: "1px solid #ccc", margin: "10px", minWidth: "300px" }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 22, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                      {evento.nombre.toUpperCase()}
                    </Typography>
                    <div sx={{ textAlign: "center" }}>
                      <p>
                        Fecha: {formatoFechaChile(evento.fechaInicio)} - {formatoFechaChile(evento.fechaTermino)}
                      </p>
                      <p>
                        Hora: {evento.horaInicio} - {evento.horaTermino}
                      </p>
                      <p>Modalidad: {evento.modalidad}</p>
                      <p>Ubicación: {evento.modalidad === "online" ? <a href={evento.ubicacion}>{evento.ubicacion}</a> : evento.ubicacion}</p>
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
          ))
        )}
      </div>
    );
  };

  return <div>{renderEventos()}</div>;
}

export default EventosRango;

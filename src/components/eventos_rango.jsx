import React, { useState, useEffect } from "react";
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

function EventosRango({ eventos }) {
  const [date, setDate] = useState(new Date());
  const [rango, setRango] = useState([null, null]);
  const [dias, setDias] = useState(7);

  useEffect(() => {
    const hoy = date;
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
      const eventosFiltrados = eventos.filter((evento) => {
        const fechaInicio = new Date(evento.dateInicio).getTime();
        return fechaInicio >= inicio && fechaInicio <= fin;
      });

      const eventosAgrupados = eventosFiltrados.reduce((grupos, evento) => {
        const fecha = new Date(evento.dateInicio).toDateString();
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
            <label htmlFor="dias">Selecciona la cantidad de días:</label>
            <select id="dias" value={dias} onChange={cambiarDias}>
              <option value="7">7</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
        {gruposEventos.map((grupo, index) => (
          <div className="row" key={index}>
            {grupo.map((evento, i) => (
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
        ))}
      </div>
    );
  };

  return <div>{renderEventos()}</div>;
}

export default EventosRango;

import React, { useState, useEffect } from "react";
import { DateRangePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

function EventosRango({ eventos }) {
  const [rango, setRango] = useState([null, null]);
  const [dias, setDias] = useState(7);

  useEffect(() => {
    const hoy = new Date();
    const fin = new Date();
    fin.setDate(hoy.getDate() + dias);
    setRango([hoy, fin]);
  }, [dias]);

  const filtrarEventos = () => {
    if (rango[0] && rango[1]) {
      const inicio = rango[0].getTime();
      const fin = rango[1].getTime();
      return eventos.filter((evento) => {
        const fechaInicio = new Date(evento.fechaInicio).getTime();
        return fechaInicio >= inicio && fechaInicio <= fin;
      });
    }
    return [];
  };

  const renderEventos = () => {
    const eventosFiltrados = filtrarEventos();
    if (eventosFiltrados.length === 0) {
      return <Typography variant="h6">No hay eventos</Typography>;
    }
    return eventosFiltrados.map((evento, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card>
          <CardContent>
            <Typography variant="h5">{evento.nombre}</Typography>
            <Typography variant="body2">Fecha: {evento.fechaInicio}</Typography>
            {/* Añade aquí más detalles del evento */}
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <div>
      <Button onClick={() => setDias(7)}>Próximos 7 días</Button>
      <Button onClick={() => setDias(14)}>Próximos 14 días</Button>
      <Button onClick={() => setDias(30)}>Próximos 30 días</Button>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Inicio"
          endText="Fin"
          value={rango}
          onChange={(newValue) => {
            setRango(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <input {...startProps} />
              <input {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
      <Grid container spacing={2} style={{ maxHeight: "80vh", overflow: "auto" }}>
        {renderEventos()}
      </Grid>
    </div>
  );
}

export default EventosRango;

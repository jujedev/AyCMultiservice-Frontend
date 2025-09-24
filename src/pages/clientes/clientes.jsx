/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

// material-ui
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// project imports
import CardDevice from 'components/cards/CardDevice';

// react
import { useEffect, useState } from 'react';
import axios from 'axios';

// images import
import s71200 from '../../assets/images/devices/s71200-g1.jpg'
import pac3200 from '../../assets/images/devices/pac3200.jpg'
import v20 from '../../assets/images/devices/v20.jpg'

// ==============================|| SAMPLE PAGE ||============================== //

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  // Cargamos la configuración SOLO una vez
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/clientes") // 👈 tu endpoint de clientes
      .then((res) => setClientes(res.data))
      .catch((err) => console.error("Error al cargar clientes:", err));
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} alignItems={'stretch'}>
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">C L I E N T E S</Typography>
          <Button variant="outlined">
            Crear cliente +
          </Button>
        </Box>
      </Grid>

      {/*Get Machines*/}
      {clientes.map((m, idx) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={{idx}}>
          <CardMachine {...m} />
        </Grid>
      ))}
    </Grid>
  );
}

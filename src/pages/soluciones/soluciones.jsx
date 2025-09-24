/* eslint-disable prettier/prettier */
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// project imports
import CardMachine from 'components/cards/CardMachine';

// images import
import panificadoraImg from '../../assets/images/machines/panificadora.png'
import cintatransportadoraImg from '../../assets/images/machines/cinta-transportadora.jpg'
import ventiladorImg from '../../assets/images/machines/fan.jpg'

// ==============================|| SAMPLE PAGE ||============================== //

export default function Soluciones() {
  const machines = [
    {
      name: 'Empaquetadora 1',
      image: panificadoraImg,
      description: "Controlada por PLC S7-1200 y medidor Sentron PAC3200",
      status: "activo",
      metrics: [
        { title: "Disponibilidad", count: 95, unit: "%" },
        { title: "Performance", count: 88, unit: "%" },
        { title: "Calidad", count: 92, unit: "%" },
        { title: "OEE", count: 77, unit: "%" }
      ]
    },
    {
      name: "Ventilador",
      image: ventiladorImg,
      status: "inactivo",
      extra: "Solo ventilador, sin métricas"
    },
    {
      name: "Cinta transportadora",
      image: cintatransportadoraImg,
      status: "activo",
      metrics: [
        { title: "Performance", count: 88, unit: "%" }
      ]
    },
    {
      name: "Empaquetadora 2",
      image: panificadoraImg,
      description: "Controlada por PLC S7-1200 y medidor Sentron PAC3200",
      status: "activo",
      metrics: [
        { title: "Disponibilidad", count: 95, unit: "%" },
        { title: "Performance", count: 88, unit: "%" },
        { title: "Calidad", count: 92, unit: "%" },
        { title: "OEE", count: 77, unit: "%" }
      ]
    }
  ];

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} alignItems={'stretch'}>
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">Información sobre las máquinas en la fábrica</Typography>
          <Button variant="outlined" disabled>
            Agregar máquina +
          </Button>
        </Box>
      </Grid>

      {/*Get Machines*/}
      {machines.map((m, idx) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={{idx}}>
          <CardMachine {...m} />
        </Grid>
      ))}
    </Grid>
  );
}

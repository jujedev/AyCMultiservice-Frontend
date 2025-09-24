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

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [statuses, setStatuses] = useState({});

  // Cargamos la configuración SOLO una vez
  useEffect(() => {
    axios.get('http://192.168.11.104:8080/api/devices')
      .then((res) => {
        // Mapeamos para agregar imágenes según el deviceID o type
        const mapped = res.data.map((d) => {
          let image;
          if (d.deviceId.includes("S71200")) image = s71200;
          else if (d.deviceId.includes("PAC-3200")) image = pac3200;
          else if (d.deviceId.includes("V20")) image = v20;
          else image = s71200; // default

          return {
            ...d,
            image,
            intervalTime: d.intervalTime
          };
        });
        setDevices(mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  // Cargamos estados cada 10s
  useEffect(() => {
    const fetchStatus = () => {
      axios.get('http://192.168.11.104:8080/api/devices/status')
       .then((res) => {
        // Transformamos el array en objeto {deviceId: status}
        console.log("Datos obtenidos de status: " + Date());
        console.log(res.data);
        
        const map = {};
        res.data.forEach((d) => {
          map[d.deviceId] = d.status;
        });
        setStatuses(map);
       })
       .catch((err) => console.error(err));
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 10000); // cada 60s
    return () => clearInterval(interval); // limpiar al desmontar
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} alignItems={'stretch'}>
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">Información sobre los dispositivos en la fábrica</Typography>
          <Button LinkComponent={Link} to="/addDevice" variant="outlined">
            Agregar dispositivo +
          </Button>
        </Box>
      </Grid>

      {/*Get Machines*/}
      {devices.map((m, idx) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={m.id || idx}>
          <CardDevice {...m} status={statuses[m.deviceId]} />
        </Grid>
      ))}
    </Grid>
  );
}

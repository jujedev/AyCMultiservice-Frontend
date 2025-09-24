// material-ui
import { useTheme } from '@mui/material/styles';

import { BarChart } from '@mui/x-charts/BarChart';
import { color } from 'framer-motion';
import { useEffect, useState } from "react";
import { getPowerFactor } from "services/energyApi";

const xLabels = ["L1", "L2", "L3", "Total"];

export default function PowerFactorBarChart() {
  const theme = useTheme();
  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };

  const [data, setData] = useState([0, 0, 0, 0]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pf = await getPowerFactor();
        setData([pf.l1, pf.l2, pf.l3, pf.total]);
      } catch (err) {
        console.error("Error al cargar Power Factor", err);
      }
    }

    fetchData();
    const id = setInterval(fetchData, 60000); // refresco cada 1 min
    return () => clearInterval(id);
  }, []);

  return (
    <BarChart
      hideLegend
      height={380}
      series={[{ data, label: 'Factor de Potencia', animation: true }]}
      xAxis={[{ data: xLabels, scaleType: 'band', disableLine: true, disableTicks: true, tickLabelStyle: axisFonstyle }]}
      barLabel="value"
      yAxis={[{
      min: 0,
      max: 1,
        lineStyle: { stroke: theme.palette.secondary.light, strokeWidth: 1.5 }, // línea Y
        tickStyle: { stroke: theme.palette.secondary.light }, // palitos de los ticks
        tickLabelStyle: { fill: theme.palette.secondary.light, fontSize: 12 }, // texto de ticks
      },]}
      slotProps={{ bar: { rx: 5, ry: 5 }, barLabel: { style: { fill: 'white' } } }}
      axisHighlight={{ x: 'none' }}
      margin={{ left: 20, right: 20 }}
      colors={[theme.palette.success.light]}
      sx={{ '& .MuiBarElement-root:hover': { opacity: 0.6 } }}
    />
  );
}

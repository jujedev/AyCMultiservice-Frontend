/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CrearVehiculo() {
  const navigate = useNavigate();

  // Estado del vehículo
  const [vehiculo, setVehiculo] = useState({
    patente: "",
    marca: "",
    modelo: "",
    anio: "",
    clienteId: "", // cliente seleccionado
  });

  // Lista de clientes desde backend
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/clientes")
      .then((res) => setClientes(res.data))
      .catch((err) => console.error("Error al cargar clientes:", err));
  }, []);

  const handleChange = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!vehiculo.clienteId) {
      alert("Debe seleccionar un cliente");
      return;
    }

    try {
      const { clienteId, ...vehiculoData } = vehiculo;
      await axios.post(
        `http://localhost:8080/api/vehiculos/${clienteId}`,
        vehiculoData
      );
      navigate("/vehiculos");
    } catch (err) {
      console.error("Error al crear vehículo:", err);
    }
  };

  return (
    <Box sx={{ p: 8, backgroundColor: 'white', boxShadow: 2, borderRadius: 4  }}>
      <Typography variant="h5" mb={2}>
        Crear Vehículo
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Patente"
          name="patente"
          value={vehiculo.patente}
          inputProps={{ maxLength: 10 }}
          onChange={handleChange}
        />
        <TextField
          label="Marca"
          name="marca"
          value={vehiculo.marca}
          onChange={handleChange}
        />
        <TextField
          label="Modelo"
          name="modelo"
          value={vehiculo.modelo}
          onChange={handleChange}
        />
        <TextField
          label="Año"
          name="anio"
          type="number"
          value={vehiculo.anio}
          onChange={handleChange}
        />

        {/* Select con clientes */}
        <TextField
          select
          label="Cliente"
          name="clienteId"
          value={vehiculo.clienteId}
          onChange={handleChange}
        >
          {clientes.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.nombre} {c.apellido} — {c.dni}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/vehiculos")}>
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
}

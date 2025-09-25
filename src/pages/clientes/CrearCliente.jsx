/* eslint-disable prettier/prettier */
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CrearCliente() {
  const navigate = useNavigate();

  // Estado cliente
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
    vehiculos: [],
  });

  // Estado vehículo en edición
  const [vehiculo, setVehiculo] = useState({
    marca: "",
    modelo: "",
    patente: "",
    anio: "",
  });

  const handleChangeCliente = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleChangeVehiculo = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };

  const agregarVehiculo = () => {
    setCliente({ ...cliente, vehiculos: [...cliente.vehiculos, vehiculo] });
    setVehiculo({ marca: "", modelo: "", patente: "" , anio: ""}); // reset form
  };

  const eliminarVehiculo = (index) => {
    const updated = cliente.vehiculos.filter((_, i) => i !== index);
    setCliente({ ...cliente, vehiculos: updated });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://192.168.11.104:8080/api/clientes", cliente);
      navigate("/clientes");
    } catch (err) {
      console.error("Error al crear cliente:", err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>
        Crear Cliente
      </Typography>

      {/* Datos del cliente */}
      <Stack spacing={2} mb={3}>
        <TextField label="Nombre" name="nombre" value={cliente.nombre} onChange={handleChangeCliente} />
        <TextField label="Apellido" name="apellido" value={cliente.apellido} onChange={handleChangeCliente} />
        <TextField label="DNI" name="dni" value={cliente.dni} onChange={handleChangeCliente} />
        <TextField label="Teléfono" name="telefono" value={cliente.telefono} onChange={handleChangeCliente} />
        <TextField label="Email" name="email" value={cliente.email} onChange={handleChangeCliente} />
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Vehículos */}
      <Typography variant="h6" mb={1}>
        Vehículos
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField label="Marca" name="marca" value={vehiculo.marca} onChange={handleChangeVehiculo} />
        <TextField label="Modelo" name="modelo" value={vehiculo.modelo} onChange={handleChangeVehiculo} />
        <TextField label="Patente" name="patente" value={vehiculo.patente} onChange={handleChangeVehiculo} />
        <TextField label="Año" name="anio" value={vehiculo.anio} onChange={handleChangeVehiculo} />
        <Button variant="outlined" onClick={agregarVehiculo}>
          Agregar
        </Button>
      </Stack>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Patente</TableCell>
            <TableCell>Año</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cliente.vehiculos.map((v, index) => (
            <TableRow key={index}>
              <TableCell>{v.marca}</TableCell>
              <TableCell>{v.modelo}</TableCell>
              <TableCell>{v.patente}</TableCell>
              <TableCell>{v.anio}</TableCell>
              <TableCell>
                <IconButton onClick={() => eliminarVehiculo(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={() => navigate("/clientes")}>
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
}

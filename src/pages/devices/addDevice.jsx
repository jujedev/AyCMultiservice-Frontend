// src/pages/devices/AgregarDispositivo.jsx

import { Link } from 'react-router-dom';
import { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AgregarDispositivo() {
  const [type, setType] = useState("");
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    // 🔹 Si el campo es numérico, lo convierto a Number
    const numericFields = ["rack", "slot", "intervalTime", "slaveId", "port", "topic"];
    setForm({
      ...form,
      [field]: numericFields.includes(field) ? Number(value) : value,
    });
  };

const handleSubmit = async () => {
  try {
    const payload = {
      type,
      deviceId: form.deviceId,       // ✅ convertir camelCase → snake_case
      host: form.host,
      intervalTime: form.intervalTime >= 0 ? form.intervalTime : null, // ✅
      rack: form.rack >= 0 ? form.rack : null,
      slot: form.slot >= 0 ? form.slot : null,
      port: form.port >= 0 ? form.port : null,
      slaveId: form.slaveId >= 0 ? form.slaveId : null,
      description: form.description || null,
      topic: form.topic || null
    };

    await axios.post("http://192.168.11.104:8080/api/devices", payload);
    alert("✅ Dispositivo agregado correctamente");
    navigate("/devices");
  } catch (err) {
    console.error(err);
    alert("❌ Error al guardar el dispositivo");
  }
};

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: "auto", mt: 4, p: 6, borderRadius: 5, boxShadow: 24 }}>
      <Typography variant="h5" gutterBottom>
        Agregar nuevo dispositivo
      </Typography>

      <TextField
        select
        fullWidth
        label="Tipo de dispositivo"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          setForm({});
        }}
        margin="normal"
      >
        <MenuItem value="s7">PLC S7-1200</MenuItem>
        <MenuItem value="pac">Sentron PAC</MenuItem>
        <MenuItem value="mqtt">MQTT</MenuItem>
      </TextField>

      {/* Campos dinámicos */}
      {type === "s7" && (
        <>
          <TextField label="ID del dispositivo" fullWidth margin="normal"
            onChange={(e) => handleChange("deviceId", e.target.value)} />
          <TextField label="Descripcion del dispositivo" fullWidth margin="normal"
            onChange={(e) => handleChange("description", e.target.value)} />
          <TextField label="Dirección IP" fullWidth margin="normal"
            onChange={(e) => handleChange("host", e.target.value)} />
          <TextField label="Rack" type="number" fullWidth margin="normal"
            onChange={(e) => handleChange("rack", e.target.value)} />
          <TextField label="Slot" type="number" fullWidth margin="normal"
            onChange={(e) => handleChange("slot", e.target.value)} />
          <TextField label="Ciclo de lectura (ms)" type="number" fullWidth margin="normal" required
            onChange={(e) => handleChange("intervalTime", e.target.value)} />
        </>
      )}

      {type === "pac" && (
        <>
          <TextField label="ID del dispositivo" fullWidth margin="normal"
            onChange={(e) => handleChange("deviceId", e.target.value)} />
          <TextField label="Descripcion del dispositivo" fullWidth margin="normal"
          onChange={(e) => handleChange("description", e.target.value)} />
          <TextField label="Dirección IP" fullWidth margin="normal"
            onChange={(e) => handleChange("host", e.target.value)} />
          <TextField label="Puerto" type="number" fullWidth margin="normal"
            onChange={(e) => handleChange("port", e.target.value)} />
          <TextField label="ID del esclavo" type="number" fullWidth margin="normal"
            onChange={(e) => handleChange("slaveId", e.target.value)} />
          <TextField label="Ciclo de lectura (ms)" type="number" fullWidth margin="normal" required
            onChange={(e) => handleChange("intervalTime", e.target.value)} />
        </>
      )}

      {type === "mqtt" && (
        <>
          <TextField label="ID del dispositivo" fullWidth margin="normal"
            onChange={(e) => handleChange("deviceId", e.target.value)} />
          <TextField label="Descripcion del dispositivo" fullWidth margin="normal"
            onChange={(e) => handleChange("description", e.target.value)} />
          <TextField label="Topic" fullWidth margin="normal"
            onChange={(e) => handleChange("topic", e.target.value)} />
          <TextField label="Dirección IP" fullWidth margin="normal"
            onChange={(e) => handleChange("host", e.target.value)} />
        </>
      )} 

      {/* Botones */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          variant="outlined"
          fullWidth
          color="secondary"
          LinkComponent={Link}
          to="/devices"
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleSubmit}
          disabled={!type}
        >
          Guardar
        </Button>
      </Box>
    </Box>
  );
}

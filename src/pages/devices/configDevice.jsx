// src/pages/devices/ConfigDevice.jsx
import { useState, useEffect } from "react";
import { TextField, MenuItem, Box, Typography, Button, Alert, Snackbar  } from "@mui/material";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ConfigDevice() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const navigate = useNavigate();

  // Estado para alertas
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  // Cargar datos del dispositivo
  useEffect(() => {
    axios
      .get(`http://192.168.11.104:8080/api/devices/${id}`)
      .then((res) => setDevice(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (field, value) => {
    setDevice({
      ...device,
      [field]: value
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar este dispositivo?")) return;
    try {
      await axios.delete(`http://192.168.11.104:8080/api/devices/${id}`);
      setMessage(" 🗑️ Dispositivo eliminado ");
      setSeverity("success");
      setOpen(true);
      //navigate("/devices");
    } catch (err) {
      console.error(err);
      setMessage(" ❌ Error al eliminar el dispositivo ");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://192.168.11.104:8080/api/devices/${id}`, device);
      setMessage(" ✅ Dispositivo actualizado ");
      setSeverity("success");
      setOpen(true);
      setIsEditing(false); // vuelve a modo lectura
      //navigate("/devices"); // opcional: volver a la lista
    } catch (err) {
      console.error(err);
      setMessage(" ❌ Error al actualizar el dispositivo ");
      setSeverity("error");
      setOpen(true);
    }
  };

  if (!device) return <Typography>Cargando dispositivo...</Typography>;

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: "auto", mt: 4, p: 6, borderRadius: 5, boxShadow: 24 }}>
      <Typography variant="h5" gutterBottom>
        Editar/Eliminar el dispositivo
      </Typography>

      <TextField
        disabled //</Box>={!isEditing}
        select
        fullWidth
        label="Tipo de dispositivo"
        value={device.type}
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
      {device.type === "s7" && (
        <>
          <TextField label="ID del dispositivo" fullWidth margin="normal" defaultValue={device.deviceId} value={device.deviceId} disabled={!isEditing}
            onChange={(e) => handleChange("deviceId", e.target.value)} />
          <TextField label="Descripcion del dispositivo" fullWidth margin="normal" defaultValue={device.description} value={device.description} disabled={!isEditing}
            onChange={(e) => handleChange("description", e.target.value)} />
          <TextField label="Dirección IP" fullWidth margin="normal" defaultValue={device.host} value={device.host} disabled={!isEditing}
            onChange={(e) => handleChange("host", e.target.value)} />
          <TextField label="Rack" type="number" fullWidth margin="normal" defaultValue={device.rack} value={device.rack} disabled={!isEditing}
            onChange={(e) => handleChange("rack", e.target.value)} />
          <TextField label="Slot" type="number" fullWidth margin="normal" defaultValue={device.slot} value={device.slot} disabled={!isEditing}
            onChange={(e) => handleChange("slot", e.target.value)} />
          <TextField label="Ciclo de lectura (ms)" type="number" fullWidth margin="normal" defaultValue={device.intervalTime} value={device.intervalTime} disabled={!isEditing}
            onChange={(e) => handleChange("intervalTime", e.target.value)} />
        </>
      )}

      {device.type === "pac" && (
        <>
          <TextField label="ID del dispositivo" fullWidth margin="normal" defaultValue={device.deviceId} value={device.deviceId} disabled={!isEditing}
            onChange={(e) => handleChange("deviceId", e.target.value)} />
          <TextField label="Descripcion del dispositivo" fullWidth margin="normal" defaultValue={device.description} value={device.description} disabled={!isEditing}
          onChange={(e) => handleChange("description", e.target.value)} />
          <TextField label="Dirección IP" fullWidth margin="normal" defaultValue={device.host} value={device.host} disabled={!isEditing}
            onChange={(e) => handleChange("host", e.target.value)} />
          <TextField label="Puerto" type="number" fullWidth margin="normal" defaultValue={device.port} value={device.port} disabled={!isEditing}
            onChange={(e) => handleChange("port", e.target.value)} />
          <TextField label="ID del esclavo" type="number" fullWidth margin="normal" defaultValue={device.slaveId} value={device.slaveId} disabled={!isEditing}
            onChange={(e) => handleChange("slaveId", e.target.value)} />
          <TextField label="Ciclo de lectura (ms)" type="number" fullWidth margin="normal" defaultValue={device.intervalTime} value={device.intervalTime} disabled={!isEditing}
            onChange={(e) => handleChange("intervalTime", e.target.value)} />
        </>
      )}

      {device.type === "mqtt" && (
        <>
          <TextField label="ID del dispositivo" fullWidth margin="normal" defaultValue={device.deviceId} value={device.deviceId} disabled={!isEditing}
            onChange={(e) => handleChange("deviceId", e.target.value)} />
          <TextField label="Descripcion del dispositivo" fullWidth margin="normal" defaultValue={device.description} value={device.description} disabled={!isEditing}
            onChange={(e) => handleChange("description", e.target.value)} />
          <TextField label="Topic" fullWidth margin="normal" defaultValue={device.topic} value={device.topic} disabled={!isEditing}
            onChange={(e) => handleChange("topic", e.target.value)} />
          <TextField label="Dirección IP" fullWidth margin="normal" defaultValue={device.host} value={device.host} disabled={!isEditing}
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

        {!isEditing ? (
          <Button
            variant="contained"
            fullWidth
            color="warning"
            onClick={() => setIsEditing(true)} // habilita edición
          >
            Editar
          </Button>
        ) : (
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={handleUpdate}
          >
            Guardar
          </Button>
        )}

        <Button
          variant="contained"
          fullWidth
          color="error"
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </Box>

      {/* Snackbar con Alert */}
      <Snackbar 
        open={open}
        autoHideDuration={3000}
        onClose={ (_, reason) => {
          // prevenimos que cierre por 2clickaway" (cuando el usuario hace click afuera)
          if(reason === "clickaway") return;
          
          setOpen(false)
          
          if(severity === "success"){
            navigate("/devices");
          }
        }}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        sx={{ width: "70%"}}>
        <Alert severity={severity} variant="filled" onClose={() => setOpen(false)} sx={{ width: "100%", color: 'white'}}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

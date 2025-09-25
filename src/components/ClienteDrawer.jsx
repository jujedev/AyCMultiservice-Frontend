/* eslint-disable prettier/prettier */
import { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

export default function ClienteDrawer({ open, onClose, cliente }) {
  const [tab, setTab] = useState(0);

  if (!cliente) return null;

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

  const handleWhatsApp = () => {
    if (cliente.telefono) {
      window.open(`https://wa.me/${cliente.telefono}?text=Hola ${cliente.nombre}, te escribo desde AyC Multiservice`, "_blank");
    }
  };

  const handlePhone = () => {
    if (cliente.telefono) {
      window.open(`tel:${cliente.telefono}`);
    }
  };

  const handleEmail = () => {
    if (cliente.email) {
      window.open(`mailto:${cliente.email}`);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100%", sm: 500 } } }} // full en mobile
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography variant="h6">
          {cliente.nombre} {cliente.apellido}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Acciones rápidas */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ p: 2 }}>
        <IconButton color="success" onClick={handleWhatsApp}>
          <WhatsAppIcon />
        </IconButton>
        <IconButton color="primary" onClick={handlePhone}>
          <PhoneIcon />
        </IconButton>
        <IconButton color="error" onClick={handleEmail}>
          <EmailIcon />
        </IconButton>
      </Stack>

      <Divider />

      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ borderBottom: "1px solid #ddd" }}
      >
        <Tab label="Datos" />
        <Tab label="Vehículos" />
        <Tab label="Tarjetas" />
      </Tabs>

      {/* Contenido por pestaña */}
      <Box sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
        {tab === 0 && (
          <Stack spacing={2}>
            <Typography><b>DNI:</b> {cliente.dni}</Typography>
            <Typography><b>Email:</b> {cliente.email}</Typography>
            <Typography><b>Teléfono:</b> {cliente.telefono}</Typography>
          </Stack>
        )}

        {tab === 1 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Vehículos
            </Typography>
            <Grid container spacing={2}>
              {(cliente.vehiculos || []).slice(0, 3).map((v) => (
                <Grid item xs={12} sm={6} key={v.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="subtitle2">
                        {v.marca} {v.modelo}
                      </Typography>
                      <Typography color="text.secondary">
                        {v.patente} - {v.anio}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {cliente.vehiculos?.length > 3 && (
              <Button fullWidth sx={{ mt: 2 }}>
                Ver todos
              </Button>
            )}
          </Box>
        )}

        {tab === 2 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Tarjetas
            </Typography>
            <Grid container spacing={2}>
              {["Borrador", "En proceso", "Finalizadas", "Abonado"].map(
                (estado) => (
                  <Grid item xs={6} sm={3} key={estado}>
                    <Card>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography variant="h6">0</Typography>
                        <Typography variant="body2">{estado}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

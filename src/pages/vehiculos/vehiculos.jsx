/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

// MUI
import { useMediaQuery, useTheme } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button
  } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Vehiculos() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [vehiculos, setVehiculos] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  // Abrir / cerrar menú de acciones
  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // Cargar vehículos desde backend
  useEffect(() => {
    axios
      .get("http://192.168.11.104:8080/api/vehiculos")
      .then((res) => {
        setVehiculos(res.data);
      })
      .catch((err) => console.error("Error al cargar vehículos:", err));
  }, []);

  // Columnas tabla desktop
  const columnsDesktop = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "patente", headerName: "Patente", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    { field: "modelo", headerName: "Modelo", flex: 1 },
    { field: "anio", headerName: "Año", flex: 1 },
    {
      field: "clienteDni",
      headerName: "Cliente (DNI)",
      flex: 1,
      renderCell: (params) => (
          <Link
            component="button"
            variant="body2"
            onClick={() => console.log("Ir a cliente:", params.row.clienteDni)}
          >
            {params.row.clienteDni || "N/A"}
          </Link>
        ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row)}>
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Columnas versión mobile (más reducida)
  const columnsMobile = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "patente", headerName: "Patente", flex: 1 },
    { field: "marca", headerName: "Marca", flex: 1 },
    {
      field: "clienteDni",
      headerName: "Cliente (DNI)",
      flex: 1,
      renderCell: (params) => {
        const cliente = params.row.cliente;
        return (
          <Link
            component="button"
            variant="body2"
            onClick={() => console.log("Ir a cliente:", params.row.clienteDni)}
          >
            {params.row.clienteDni || "N/A"}
          </Link>
        );
      },
    },
    {
      field: "acciones",
      headerName: "⚙️",
      width: 60,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(e) => handleMenuOpen(e, params.row)}>
            <MoreVertIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Acciones de ejemplo
  const handleEditar = () => {
    console.log("Editar vehículo:", selectedRow);
    handleMenuClose();
  };

  const handleEliminar = () => {
    console.log("Eliminar vehículo:", selectedRow);
    handleMenuClose();
  };

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      {/* Header con título y botón */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5">Vehículos</Typography>
        <Button variant="contained" color="primary" LinkComponent={Link} to="/vehiculos/nuevo">
          Crear Vehículo +
        </Button>
      </Box>

      {/* Tabla de vehículos */}
      <DataGrid
        rows={vehiculos}
        columns={isMobile ? columnsMobile : columnsDesktop}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        getRowId={(row) => row.id}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #eee",
          },
        }}
      />

      {/* Menú de acciones */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditar}>Editar</MenuItem>
        <MenuItem onClick={handleEliminar}>Eliminar</MenuItem>
      </Menu>
    </Box>
  );
}

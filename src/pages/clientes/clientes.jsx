/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
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
  Button,
  Drawer,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ClienteDrawer from "../../components/ClienteDrawer";

export default function Clientes() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [clientes, setClientes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // 👈 Drawer lateral
  const [clienteDetalle, setClienteDetalle] = useState(null);


  // Abrir / cerrar menú de acciones
  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Abrir Drawer con info
  const handleInfo = () => {
    setDrawerOpen(true);
    handleMenuClose();
  };

  const handleOpenDrawer = (row) => {
  setClienteDetalle(row);
  setDrawerOpen(true);
};

const handleCloseDrawer = () => {
  setDrawerOpen(false);
  setClienteDetalle(null);
};

  // Cargar clientes desde backend
  useEffect(() => {
    axios
      .get("http://192.168.11.104:8080/api/clientes")
      .then((res) => {
        setClientes(res.data);
      })
      .catch((err) => console.error("Error al cargar clientes:", err));
  }, []);

  // Columnas de la tabla versión Desktop
  const columnsDesktop = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "apellido", headerName: "Apellido", flex: 1 },
    { field: "dni", headerName: "DNI", flex: 1 },
    { field: "telefono", headerName: "Teléfono", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
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

  // Columnas de la tabla versión mobile
  const columnsMobile = [
    { field: "id", headerName: "ID", width: 15 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "apellido", headerName: "Apellido", flex: 1 },
    { field: "dni", headerName: "DNI", flex: 1 },
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
        <Typography variant="h5">Clientes</Typography>
        <Button variant="contained" color="primary">
          Crear cliente +
        </Button>
      </Box>

      {/* Tabla de clientes */}
      <DataGrid
        rows={clientes}
        columns={isMobile ? columnsMobile : columnsDesktop}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        getRowId={(row) => row.id} // 👈 clave única
        onRowDoubleClick={(params) => handleOpenDrawer(params.row)}
        sx={{
          backgroundColor: theme.palette.secondary.A100,
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
        <MenuItem
          onClick={() => {
            handleOpenDrawer(selectedRow); // abrir drawer con datos del cliente
            handleMenuClose();
          }}
        >
          Información
        </MenuItem>
        <MenuItem onClick={() => {console.log("Editar")}}>Editar</MenuItem>
        <MenuItem onClick={() => {console.log("Eliminar")}}>Eliminar</MenuItem>
      </Menu>

      {/* Drawer lateral */}
      <ClienteDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        cliente={clienteDetalle}
      />
    </Box>
  );
}
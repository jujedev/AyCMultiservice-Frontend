/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import axios from "axios";

import { Link, useNavigate } from 'react-router-dom';

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
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import ClienteDrawer from "../../components/ClienteDrawer";

export default function Clientes() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [clientes, setClientes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clienteDetalle, setClienteDetalle] = useState(null);

  {/* Snackbar */}
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Abrir / cerrar menú de acciones
  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawer = (row) => {
  setClienteDetalle(row);
  setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setClienteDetalle(null);
  };

  const handleCloseDialog = () => {
  setOpenDialog(false);
  setClienteAEliminar(null);
};

const handleDelete = async () => {
  if (!clienteAEliminar) return;

  try {
    await axios.delete(`http://localhost:8080/api/clientes/${clienteAEliminar.id}`);
    setClientes(clientes.filter((c) => c.id !== clienteAEliminar.id));
    setClienteAEliminar(null);

    setSnackbar({
      open: true,
      message: "Cliente eliminado correctamente",
      severity: "success",
    });
  } catch (err) {
    console.error("Error al eliminar cliente:", err);
    setSnackbar({
      open: true,
      message: "Error al eliminar el cliente",
      severity: "error",
    });
  }
};

  // Cargar clientes desde backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/clientes")
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
        <Button variant="contained" color="primary" LinkComponent={Link} to="/clientes/nuevo">
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
            handleOpenDrawer(selectedRow);
            handleMenuClose();
          }}
        >
          Información
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/clientes/${selectedRow.id}/editar`);}}
          >Editar</MenuItem>
        <MenuItem onClick={() => {
          setClienteAEliminar(selectedRow);
          setOpenDialog(true);
          handleMenuClose();}}
          >Eliminar</MenuItem>
      </Menu>

      {/* Drawer lateral */}
      <ClienteDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        cliente={clienteDetalle}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro que deseas eliminar al cliente{" "}
            <strong>{clienteAEliminar?.nombre} {clienteAEliminar?.apellido}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDelete(clienteAEliminar.id);
              handleCloseDialog();
            }}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
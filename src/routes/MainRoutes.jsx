/* eslint-disable prettier/prettier */
import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
//import { patch } from '@mui/material';

// render - Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - Login
const Login = Loadable(lazy(() => import('pages/auth/Login')))

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));
const Machines = Loadable(lazy(() => import('pages/machines/machines')));
const Devices = Loadable(lazy(() => import('pages/devices/devices')));
const AddDevice = Loadable(lazy(() => import('pages/devices/addDevice')));
const ConfigDevice = Loadable(lazy(() => import('pages/devices/configDevice')));

const Tarjetas = Loadable(lazy(() => import('pages/tarjetas/tarjetas')));

const Clientes = Loadable(lazy(() => import('pages/clientes/clientes')));
const CrearCliente = Loadable(lazy(() => import('pages/clientes/CrearCliente')));
const EditarCliente = Loadable(lazy(() => import('pages/clientes/EditarCliente')));

const Vehiculos = Loadable(lazy(() => import('pages/vehiculos/vehiculos')));
const CrearVehiculo = Loadable(lazy(() => import('pages/vehiculos/CrearVehiculo')));
const EditarVehiculo = Loadable(lazy(() => import('pages/vehiculos/EditarVehiculo')));

const Soluciones = Loadable(lazy(() => import('pages/soluciones/soluciones')));
const Manuales = Loadable(lazy(() => import('pages/manuales/manuales')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  //element: <DashboardLayout />,
  children: [
    // Ruta de login como principal
    {
      path: '/',
      element: <Login />
    },
    // opcional: si alguien pone /dashboard o /app, recién carga el layout
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
        
        path: 'dashboard',
        children: [
          {
            path: 'default',
            element: <DashboardDefault />
          }
        ]
        },
        {
          path: 'machines',
          element: <Machines />
        },
        {
          path: 'devices',
          element: <Devices />
        },
        {
          path: 'addDevice',
          element: <AddDevice />
        },
        {
          path: 'configDevice/:id',
          element: <ConfigDevice />
        },
        {
          path: 'tarjetas',
          element: <Tarjetas />
        },
        {
          path: 'clientes',
          element: <Clientes />
        },
        {
          path: '/clientes/nuevo',
          element: <CrearCliente />
        },
        {
          path: '/clientes/:id/editar',
          element: <EditarCliente />
        },
        {
          path: 'vehiculos',
          element: <Vehiculos />
        },
        {
          path: '/vehiculos/nuevo',
          element: <CrearVehiculo />
        },
        {
          path: '/vehiculos/:id/editar',
          element: <EditarVehiculo />
        },
        {
          path: 'soluciones',
          element: <Soluciones />
        },
        {
          path: 'manuales',
          element: <Manuales />
        },
        {
          path: 'typography',
          element: <Typography />
        },
        {
          path: 'color',
          element: <Color />
        },
        {
          path: 'shadow',
          element: <Shadow />
        },
        {
          path: 'sample-page',
          element: <SamplePage />
        }
      ]
    }
  ]
};

export default MainRoutes;

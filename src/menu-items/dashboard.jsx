// assets
import { DashboardOutlined, DeploymentUnitOutlined, BugOutlined } from '@ant-design/icons';
import StyleIcon from '@mui/icons-material/Style';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
// icons
const icons = {
  DashboardOutlined,
  DeploymentUnitOutlined,
  BugOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'machines',
      title: 'Máquinas',
      type: 'item',
      url: 'machines',
      icon: icons.DeploymentUnitOutlined,
      breadcrumbs: false
    },
    {
      id: 'devices',
      title: 'Dispositivos',
      type: 'item',
      url: 'devices',
      icon: icons.BugOutlined,
      breadcrumbs: false
    },
    {
      id: 'tarjetas',
      title: 'Tarjetas',
      type: 'item',
      url: 'tarjetas',
      icon: StyleIcon,
      breadcrumbs: false
    },
    {
      id: 'clientes',
      title: 'Clientes',
      type: 'item',
      url: 'clientes',
      icon: PersonIcon,
      breadcrumbs: false
    },
    {
      id: 'vehiculos',
      title: 'Vehículos',
      type: 'item',
      url: 'vehiculos',
      icon: DirectionsCarIcon,
      breadcrumbs: false
    },
    {
      id: 'soluciones',
      title: 'Soluciones',
      type: 'item',
      url: 'soluciones',
      icon: BookmarkAddedIcon,
      breadcrumbs: false
    },
    {
      id: 'manuales',
      title: 'Manuales',
      type: 'item',
      url: 'manuales',
      icon: BookIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

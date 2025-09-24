// assets
import { DashboardOutlined, DeploymentUnitOutlined, BugOutlined } from '@ant-design/icons';
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
      icon: icons.DeploymentUnitOutlined,
      breadcrumbs: false
    },
    {
      id: 'clientes',
      title: 'Clientes',
      type: 'item',
      url: 'clientes',
      icon: icons.DeploymentUnitOutlined,
      breadcrumbs: false
    },
    {
      id: 'vehiculos',
      title: 'Vehículos',
      type: 'item',
      url: 'vehiculos',
      icon: icons.DeploymentUnitOutlined,
      breadcrumbs: false
    },
    {
      id: 'soluciones',
      title: 'Soluciones',
      type: 'item',
      url: 'soluciones',
      icon: icons.DeploymentUnitOutlined,
      breadcrumbs: false
    },
    {
      id: 'manuales',
      title: 'Manuales',
      type: 'item',
      url: 'manuales',
      icon: icons.DeploymentUnitOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;

import { 
  Home, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  CreditCard, 
  HelpCircle,
} from 'lucide-react';
import { NavigationConfig } from '../types/navigationtype';


const NAVIGATION_CONFIG: NavigationConfig = {
  header: {
    id: 'header',
    items: [],
  },
  content: [
    {
      id: 'main',
      title: 'Main Navigation',
      items: [
        {
          id: 'members',
          type: 'item',
          label: 'Gestión de miembros',
          icon: Users,
          href: '/members',
        },
        {
          id: 'attendance',
          type: 'item',
          label: 'Gestión de asistencia',
          icon: Calendar,
          href: '/attendance',
        },
        {
          id: 'routines',
          type: 'item',
          label: 'Gestión de rutinas',
          icon: BarChart3,
          href: '/routines',
        },
        {
          id: 'exercises',
          type: 'item',
          label: 'Gestión de ejercicios',
          icon: Home,
          href: '/exercises',
        },
        {
          id: 'trainers',
          type: 'item',
          label: 'Gestión de entrenadores',
          icon: Users,
          href: '/trainers',
        },
        {
          id: 'reports',
          type: 'item',
          label: 'Reportes',
          icon: BarChart3,
          href: '/reports',
        },
        {
          id: 'billing',
          type: 'item',
          label: 'Control de pagos',
          icon: CreditCard,
          href: '/billing',
        },
      ],
    },
  ],
  footer: {
    id: 'footer',
    items: [
      {
        id: 'settings',
        type: 'item',
        label: 'Settings',
        icon: Settings,
        href: '/gym/profile',
      },
      {
        id: 'help',
        type: 'item',
        label: 'Help & Support',
        icon: HelpCircle,
        href: '/help',
      },
    ],
  },
} as const;

const NAVIGATION_ROUTES = {
  DASHBOARD: '/dashboard',
  MEMBERS: '/members',
  SCHEDULE: '/schedule',
  ANALYTICS: {
    REVENUE: '/analytics/revenue',
    MEMBERSHIP: '/analytics/membership',
  },
  BILLING: '/billing',
  SETTINGS: '/settings',
  HELP: '/help',
  PROFILE: '/profile',
} as const;

export { NAVIGATION_CONFIG, NAVIGATION_ROUTES };
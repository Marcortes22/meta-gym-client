import { 
  Home, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  CreditCard, 
  HelpCircle,
  Bell,
  User
} from 'lucide-react';
import { NavigationConfig } from '../types/navigationtype';


const NAVIGATION_CONFIG: NavigationConfig = {
  header: {
    id: 'header',
    items: [
      {
        id: 'notifications',
        type: 'item',
        label: 'Notifications',
        icon: Bell,
        badge: 3,
      },
      {
        id: 'profile',
        type: 'item',
        label: 'Profile',
        icon: User,
        href: '/profile',
      },
    ],
  },
  content: [
    {
      id: 'main',
      title: 'Main Navigation',
      items: [
        {
          id: 'dashboard',
          type: 'item',
          label: 'Dashboard',
          icon: Home,
          href: '/dashboard',
        },
        {
          id: 'members',
          type: 'item',
          label: 'Members',
          icon: Users,
          href: '/members',
          badge: '12',
        },
        {
          id: 'schedule',
          type: 'item',
          label: 'Schedule',
          icon: Calendar,
          href: '/schedule',
        },
        {
          id: 'separator-1',
          type: 'separator',
        },
      ],
    },
    {
      id: 'management',
      title: 'Management',
      items: [
        {
          id: 'analytics',
          type: 'group',
          label: 'Analytics',
          icon: BarChart3,
          items: [
            {
              id: 'revenue',
              type: 'item',
              label: 'Revenue',
              href: '/analytics/revenue',
            },
            {
              id: 'membership',
              type: 'item',
              label: 'Membership Stats',
              href: '/analytics/membership',
            },
          ],
        },
        {
          id: 'billing',
          type: 'item',
          label: 'Billing',
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
        href: '/settings',
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
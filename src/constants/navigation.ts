import type { NavigationLink } from '../types/navigation';

export const MAIN_NAVIGATION: NavigationLink[] = [
  {
    title: 'Panel de control',
    icon: 'fa-solid fa-chart-area',
    link: '/',
    description: 'Vista general del dashboard',
  },
  {
    title: 'Campañas',
    icon: 'fa-solid fa-rocket',
    link: '/campaigns',
    description: 'Gestión de campañas',
  },
  {
    title: 'Plantillas',
    icon: 'fa-solid fa-file-invoice',
    link: '/templates',
    description: 'Gestión de plantillas de mensajes',
  },
  {
    title: 'Contactos',
    icon: 'fa-solid fa-user-group',
    link: '/contacts',
    description: 'Administración de contactos',
  },
  {
    title: 'Configuración',
    icon: 'fa-solid fa-gear',
    link: '/settings',
    description: 'Ajustes de la aplicación',
  },
] as const;

export const APP_ICON = `img:data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="rgb(22 163 74 / 1)"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;

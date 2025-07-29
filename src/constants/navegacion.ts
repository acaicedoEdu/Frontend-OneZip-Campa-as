import type { LinkNavegacion } from '../types/navegacion';

export const NAVEGACION_PRINCIPAL: LinkNavegacion[] = [
  {
    titulo: 'Panel de control',
    icono: 'fa-solid fa-chart-area',
    link: '/',
    descripcion: 'Resumen de tus campañas de WhatsApp Business',
    botones: [
      {
        titulo: 'Nueva campaña',
        icono: 'fa-solid fa-plus',
        principal: true,
      },
    ],
  },
  {
    titulo: 'Campañas',
    icono: 'fa-solid fa-rocket',
    link: '/campana',
    descripcion: 'Gestiona tus campañas de WhatsApp Business',
    botones: [
      {
        titulo: 'Nueva campaña',
        link: '/campana/nueva',
        icono: 'fa-solid fa-plus',
        principal: true,
      },
    ],
  },
  {
    titulo: 'Plantillas',
    icono: 'fa-solid fa-file-invoice',
    link: '/plantilla',
    descripcion: 'Plantillas de mensajes aprobadas por WhatsApp Business',
  },
  {
    titulo: 'Grupos',
    icono: 'fa-solid fa-user-group',
    link: '/grupo',
    descripcion: 'Gestiona tus grupos y contactos individuales',
    botones: [
      {
        titulo: 'Importar',
        icono: 'fa-solid fa-arrow-up-from-bracket',
        principal: false,
      },
      {
        titulo: 'Crear Nuevo',
        icono: 'fa-solid fa-plus',
        principal: true,
        opciones: [
          {
            titulo: 'Nuevo Grupo',
            icono: 'fa-solid fa-folder-plus',
          },
          {
            titulo: 'Nuevo Contacto',
            icono: 'fa-solid fa-user-plus',
          },
        ],
      },
    ],
  },
  {
    titulo: 'Configuración',
    icono: 'fa-solid fa-gear',
    link: '/configuracion',
    descripcion: 'Ajustes de la aplicación',
  },
] as const;

export const ICONO_APON = `img:data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" color="rgb(22 163 74 / 1)"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;

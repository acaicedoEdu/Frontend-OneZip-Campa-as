import { type VacioDatos } from '../types/vaciodatos';
import { toggleAgregarGrupo } from '../composables/grupo/vaciodatos';

export const VACIO_DATOS: VacioDatos[] = [
  {
    pagina: 'grupo',
    titulo: '¡Organiza tus contactos!',
    descripcion:
      'Los grupos te ayudan a organizar tus contactos de manera eficiente. Crea grupos por ubicación, tipo de cliente, o cualquier criterio que necesites.',
    puntos: [
      {
        titulo: 'Organización inteligente',
        descripcion: 'Agrupa contactos por criterios específicos',
        icono: 'fa-solid fa-folder-open',
        color: 'green',
      },
      {
        titulo: 'Campañas dirigidas',
        descripcion: 'Envía mensajes específicos a cada grupo',
        icono: 'fa-solid fa-rocket',
        color: 'blue',
      },
      {
        titulo: 'Importación masiva',
        descripcion: 'Sube archivos Excel o CSV directamente',
        icono: 'fa-solid fa-upload',
        color: 'purple',
      },
    ],
    botones: [
      {
        titulo: 'Crear mi primer grupo',
        icono: 'fa-solid fa-folder-plus',
        color: 'green',
        funcion: toggleAgregarGrupo,
      },
      {
        titulo: 'Importar Contactos',
        icono: 'fa-solid fa-upload',
        color: 'white',
        funcion: () => {},
      },
    ],
  },
  {
    pagina: 'aplicacion',
    titulo: '¡Crea tus aplicaciones de WhatsApp!',
    descripcion:
      'Las aplicaciones te permiten gestionar líneas de WhatsApp para envíos masivos. Crea y administra todas tus aplicaciones desde un solo lugar.',
    puntos: [
      {
        titulo: 'Gestión completa',
        descripcion: 'Crea y administra múltiples lineas de WhatsApp desde una sola plataforma',
        icono: 'fa-solid fa-gear',
        color: 'green',
      },
      {
        titulo: 'Envíos masivos',
        descripcion: 'Distribuye tus campañas entre diferentes aplicaciones para mayor alcance',
        icono: 'fa-solid fa-message',
        color: 'blue',
      },
    ],
    botones: [
      {
        titulo: 'Crear mi primer aplicacion',
        icono: 'fa-solid fa-plus',
        color: 'green',
        link: '/configuracion',
      },
    ],
  },
  {
    pagina: 'campana',
    titulo: '¡Lanza tus campañas masivas!',
    descripcion:
      'Las campañas te permiten gestionar líneas de WhatsApp para envíos masivos. Crea y administra todas tus campañas desde un solo lugar.',
    puntos: [
      {
        titulo: 'Gestión completa',
        descripcion: 'Crea y administra múltiples lineas de WhatsApp desde una sola plataforma',
        icono: 'fa-solid fa-gear',
        color: 'green',
      },
      {
        titulo: 'Envíos masivos',
        descripcion: 'Distribuye tus campañas entre diferentes aplicaciones para mayor alcance',
        icono: 'fa-solid fa-message',
        color: 'blue',
      },
    ],
    botones: [
      {
        titulo: 'Ejecutar mi primer campaña',
        icono: 'fa-solid fa-rocket',
        color: 'green',
        link: '/crear',
      },
    ],
  },
];

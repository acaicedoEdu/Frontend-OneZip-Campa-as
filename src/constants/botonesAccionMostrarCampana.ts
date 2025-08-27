import type { Campana } from 'src/types/campana';
import { useCampanaStore } from 'src/stores/campana.store';

export const botonesAccion = [
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    idEstado: 8,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    idEstado: 3,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    idEstado: 7,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    idEstado: 10,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    idEstado: 9,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'pausar',
    icono: 'fa-solid fa-pause',
    accion: async (campana: Campana) => {
      if (!campana.IdCampana) return;
      await useCampanaStore().pausarCampana(campana.IdCampana);
    },
    idEstado: 3,
    mensajeTooltip: 'Pausar campaña',
  },
  {
    nombre: 'seguir',
    icono: 'fa-solid fa-play',
    accion: async (campana: Campana) => {
      if (!campana.IdCampana) return;
      await useCampanaStore().desPausarCampana(campana.IdCampana);
    },
    idEstado: 7,
    mensajeTooltip: 'Reanudar campaña',
  },
  // {
  //   nombre: 'eliminar',
  //   icono: 'fa-solid fa-trash',
  //   accion: (campana: Campana) => {
  //     console.log('Eliminar:', campana.IdCampana);
  //   },
  //   idEstado: 8,
  //   mensajeTooltip: 'Eliminar campaña',
  // },
  // {
  //   nombre: 'eliminar',
  //   icono: 'fa-solid fa-trash',
  //   accion: (campana: Campana) => {
  //     console.log('Eliminar:', campana.IdCampana);
  //   },
  //   idEstado: 6,
  //   mensajeTooltip: 'Eliminar campaña',
  // },
  // {
  //   nombre: 'eliminar',
  //   icono: 'fa-solid fa-trash',
  //   accion: (campana: Campana) => {
  //     console.log('Eliminar:', campana.IdCampana);
  //   },
  //   idEstado: 9,
  //   mensajeTooltip: 'Eliminar campaña',
  // },
  // {
  //   nombre: 'eliminar',
  //   icono: 'fa-solid fa-trash',
  //   accion: (campana: Campana) => {
  //     console.log('Eliminar:', campana.IdCampana);
  //   },
  //   idEstado: 10,
  //   mensajeTooltip: 'Eliminar campaña',
  // },
  {
    nombre: 'cancelar',
    icono: 'fa-solid fa-xmark',
    accion: async (campana: Campana) => {
      if (!campana.IdCampana) return;
      await useCampanaStore().cancelarCampana(campana.IdCampana);
    },
    idEstado: 3,
    mensajeTooltip: 'Cancelar campaña',
  },
  {
    nombre: 'cancelar',
    icono: 'fa-solid fa-xmark',
    accion: async (campana: Campana) => {
      if (!campana.IdCampana) return;
      await useCampanaStore().cancelarCampana(campana.IdCampana);
    },
    idEstado: 6,
    mensajeTooltip: 'Cancelar campaña',
  },
  {
    nombre: 'cancelar',
    icono: 'fa-solid fa-xmark',
    accion: async (campana: Campana) => {
      if (!campana.IdCampana) return;
      await useCampanaStore().cancelarCampana(campana.IdCampana);
    },
    idEstado: 7,
    mensajeTooltip: 'Cancelar campaña',
  },
];

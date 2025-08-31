import type { Campana } from 'src/types/campana';
import { useCampanaStore } from 'src/stores/campana.store';
import { useAlertaConfirmacion } from 'src/stores/alertaConfirmacion.store';
import { datosCancelarAlertaConfirmacion } from './datosCancelarAlertaConfirmacion';
import { datosReanudarAlertaConfirmacion } from './datosReanudarAlertaConfirmacion';

export const botonesAccion = [
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    loading: false,
    idEstado: 8,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    loading: false,
    idEstado: 3,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    loading: false,
    idEstado: 7,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    loading: false,
    idEstado: 10,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    loading: false,
    idEstado: 9,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'visualizar',
    icono: 'fa-solid fa-eye',
    to: '/campana/',
    loading: false,
    idEstado: 12,
    mensajeTooltip: 'Ver campaña',
  },
  {
    nombre: 'pausar',
    icono: 'fa-solid fa-square',
    loading: true,
    accion: async (campana: Campana) => {
      if (!campana.IdCampana) return;
      await useCampanaStore().pausarCampana(campana.IdCampana);
    },
    idEstado: 3,
    mensajeTooltip: 'Pausar campaña',
  },
  {
    nombre: 'pausar',
    icono: 'fa-solid fa-square',
    loading: true,
    accion: async (campana: Campana) => {
      if (!campana.IdCampana) return;
      await useCampanaStore().pausarCampana(campana.IdCampana);
    },
    idEstado: 12,
    mensajeTooltip: 'Pausar campaña',
  },
  {
    nombre: 'seguir',
    icono: 'fa-solid fa-play',
    loading: true,
    accion: (campana: Campana) => {
      if (!campana.IdCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      useAlertaConfirmacion().setAlertaConfirmacion(datosReanudarAlertaConfirmacion);
      datosReanudarAlertaConfirmacion.nombreCampana = campana.Nombre;
      datosReanudarAlertaConfirmacion.idCampana = campana.IdCampana;
    },
    idEstado: 7,
    mensajeTooltip: 'Reanudar campaña',
    style: 'color: #16a34a !important',
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
    loading: true,
    accion: (campana: Campana) => {
      if (!campana.IdCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosCancelarAlertaConfirmacion.nombreCampana = campana.Nombre;
      datosCancelarAlertaConfirmacion.idCampana = campana.IdCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosCancelarAlertaConfirmacion);
    },
    idEstado: 3,
    mensajeTooltip: 'Cancelar campaña',
  },
  {
    nombre: 'cancelar',
    icono: 'fa-solid fa-xmark',
    loading: true,
    accion: (campana: Campana) => {
      if (!campana.IdCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosCancelarAlertaConfirmacion.nombreCampana = campana.Nombre;
      datosCancelarAlertaConfirmacion.idCampana = campana.IdCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosCancelarAlertaConfirmacion);
    },
    idEstado: 6,
    mensajeTooltip: 'Cancelar campaña',
  },
  {
    nombre: 'cancelar',
    icono: 'fa-solid fa-xmark',
    loading: true,
    accion: (campana: Campana) => {
      if (!campana.IdCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosCancelarAlertaConfirmacion.nombreCampana = campana.Nombre;
      datosCancelarAlertaConfirmacion.idCampana = campana.IdCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosCancelarAlertaConfirmacion);
    },
    idEstado: 7,
    mensajeTooltip: 'Cancelar campaña',
  },
  {
    nombre: 'cancelar',
    icono: 'fa-solid fa-xmark',
    loading: true,
    accion: (campana: Campana) => {
      if (!campana.IdCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosCancelarAlertaConfirmacion.nombreCampana = campana.Nombre;
      datosCancelarAlertaConfirmacion.idCampana = campana.IdCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosCancelarAlertaConfirmacion);
    },
    idEstado: 12,
    mensajeTooltip: 'Cancelar campaña',
  },
];

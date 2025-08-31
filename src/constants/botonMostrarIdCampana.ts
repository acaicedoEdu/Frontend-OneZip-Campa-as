import type { BotonMostrarIdCampana } from 'src/types/botonMostrarIdCampana';
import { useMensajeStore } from 'src/stores/mensaje.store';
import { useCampanaStore } from 'src/stores/campana.store';
import { useAlertaConfirmacion } from 'src/stores/alertaConfirmacion.store';
import { datosCancelarAlertaConfirmacion } from './datosCancelarAlertaConfirmacion';
import { datosReanudarAlertaConfirmacion } from './datosReanudarAlertaConfirmacion';

const exportarReporte = async (idCampana: number) => {
  await useMensajeStore().exportarReporte(idCampana);
};

export const botonesMostrarIdCampana: BotonMostrarIdCampana[] = [
  {
    IdBoton: 4234,
    IdEstado: 8,
    outline: true,
    loading: false,
    clase: 'soft-text bg-white',
    icono: 'fa-solid fa-file-arrow-down text-dark',
    link: `http://localhost:5263/api/Mensaje/exportar-reporte/campana/`,
    accion: exportarReporte,
    span: {
      clase: 'text-subtitle2 q-ml-sm text-dark',
      valor: 'Exportar Reporte',
    },
  },
  {
    IdBoton: 123231,
    IdEstado: 3,
    outline: true,
    loading: true,
    clase: 'bg-white text-orange-8',
    icono: 'fa-solid fa-pause',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Pausar',
    },
    accion: async (idCampana: number) => {
      if (!idCampana) return;
      await useCampanaStore().pausarCampana(idCampana);
    },
  },
  {
    IdBoton: 123231,
    IdEstado: 12,
    outline: true,
    clase: 'bg-white text-orange-8',
    icono: 'fa-solid fa-pause',
    loading: true,
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Pausar',
    },
    accion: async (idCampana: number) => {
      if (!idCampana) return;
      await useCampanaStore().pausarCampana(idCampana);
    },
  },
  {
    IdBoton: 67678899,
    IdEstado: 7,
    outline: false,
    loading: true,
    clase: 'verde-principal text-white',
    icono: 'fa-solid fa-play',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Seguir',
    },
    accion: (idCampana: number) => {
      if (!idCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosReanudarAlertaConfirmacion.nombreCampana =
        useCampanaStore().getCampanaXAplicacionById(idCampana)?.Nombre || '';
      datosReanudarAlertaConfirmacion.idCampana = idCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosReanudarAlertaConfirmacion);
    },
  },
  {
    IdBoton: 34555,
    IdEstado: 3,
    outline: true,
    loading: true,
    clase: 'bg-white text-red-8',
    icono: 'fa-solid fa-xmark',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Cancelar',
    },
    accion: (idCampana: number) => {
      if (!idCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosCancelarAlertaConfirmacion.nombreCampana =
        useCampanaStore().getCampanaXAplicacionById(idCampana)?.Nombre || '';
      datosCancelarAlertaConfirmacion.idCampana = idCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosCancelarAlertaConfirmacion);
    },
  },
  {
    IdBoton: 34555311,
    IdEstado: 6,
    outline: true,
    loading: true,
    clase: 'bg-white text-red-8',
    icono: 'fa-solid fa-xmark',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Cancelar',
    },
    accion: (idCampana: number) => {
      if (!idCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosCancelarAlertaConfirmacion.nombreCampana =
        useCampanaStore().getCampanaXAplicacionById(idCampana)?.Nombre || '';
      datosCancelarAlertaConfirmacion.idCampana = idCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosCancelarAlertaConfirmacion);
    },
  },
  {
    IdBoton: 2367860,
    IdEstado: 7,
    outline: true,
    loading: true,
    clase: 'bg-white text-red-8',
    icono: 'fa-solid fa-xmark',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Cancelar',
    },
    accion: (idCampana: number) => {
      if (!idCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosCancelarAlertaConfirmacion.nombreCampana =
        useCampanaStore().getCampanaXAplicacionById(idCampana)?.Nombre || '';
      datosCancelarAlertaConfirmacion.idCampana = idCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosCancelarAlertaConfirmacion);
    },
  },
  {
    IdBoton: 231110,
    IdEstado: 12,
    outline: true,
    loading: true,
    clase: 'bg-white text-red-8',
    icono: 'fa-solid fa-xmark',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Cancelar',
    },
    accion: (idCampana: number) => {
      if (!idCampana) return;
      useAlertaConfirmacion().toggleDialogAlertaConfirmacion();
      datosCancelarAlertaConfirmacion.nombreCampana =
        useCampanaStore().getCampanaXAplicacionById(idCampana)?.Nombre || '';
      datosCancelarAlertaConfirmacion.idCampana = idCampana;
      useAlertaConfirmacion().setAlertaConfirmacion(datosCancelarAlertaConfirmacion);
    },
  },
];

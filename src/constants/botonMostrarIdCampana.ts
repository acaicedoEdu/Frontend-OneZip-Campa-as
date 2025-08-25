import type { BotonMostrarIdCampana } from 'src/types/botonMostrarIdCampana';
import { useMensajeStore } from 'src/stores/mensaje.store';
import { useCampanaStore } from 'src/stores/campana.store';

const exportarReporte = async (idCampana: number) => {
  await useMensajeStore().exportarReporte(idCampana);
};

export const botonesMostrarIdCampana: BotonMostrarIdCampana[] = [
  {
    IdBoton: 4234,
    IdEstado: 8,
    outline: true,
    clase: 'soft-text bg-white',
    icono: 'fa-solid fa-file-arrow-down text-dark',
    link: `http://localhost:55604/api/mensaje/exportar-reporte/campana/`,
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
    IdBoton: 67678899,
    IdEstado: 7,
    outline: false,
    clase: 'verde-principal text-white',
    icono: 'fa-solid fa-play',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Seguir',
    },
    accion: async (idCampana: number) => {
      if (!idCampana) return;
      await useCampanaStore().desPausarCampana(idCampana);
    },
  },
  {
    IdBoton: 34555,
    IdEstado: 3,
    outline: true,
    clase: 'bg-white text-red-8',
    icono: 'fa-solid fa-xmark',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Cancelar',
    },
    accion: async (idCampana: number) => {
      if (!idCampana) return;
      await useCampanaStore().cancelarCampana(idCampana);
    },
  },
  {
    IdBoton: 2367860,
    IdEstado: 7,
    outline: true,
    clase: 'bg-white text-red-8',
    icono: 'fa-solid fa-xmark',
    span: {
      clase: 'text-subtitle2 q-ml-sm',
      valor: 'Cancelar',
    },
    accion: async (idCampana: number) => {
      if (!idCampana) return;
      await useCampanaStore().cancelarCampana(idCampana);
    },
  },
];

import { useCampanaStore } from 'src/stores/campana.store';
import { type CardEstadisticas } from 'src/types/cardEstadisticas';
import { cardEstadisticas } from 'src/constants/CardEstadisticas';

export function obtenerDatosCardEstadisticas(): CardEstadisticas[] {
  const campanaStore = useCampanaStore();
  const datosNumerosMensaje = campanaStore.campana?.DatosNumerosMensaje;
  const tasaEntrega = datosNumerosMensaje?.TotalDestinatarios
    ? (datosNumerosMensaje.TotalEntregados / datosNumerosMensaje.TotalDestinatarios) * 100
    : 0;
  const tasaLeidos = datosNumerosMensaje?.TotalDestinatarios
    ? (datosNumerosMensaje.TotalLeidos / datosNumerosMensaje.TotalDestinatarios) * 100
    : 0;
  const tasaFallidos = datosNumerosMensaje?.TotalDestinatarios
    ? (datosNumerosMensaje.TotalFallidos / datosNumerosMensaje.TotalDestinatarios) * 100
    : 0;

  return cardEstadisticas.map((cardEstadistica) => {
    if (cardEstadistica.titulo === 'Total Enviados') {
      return {
        ...cardEstadistica,
        valor: datosNumerosMensaje?.TotalEnviados || 0,
        totalDestinatarios: datosNumerosMensaje?.TotalDestinatarios || 0,
      };
    }

    if (cardEstadistica.titulo === 'Entregados') {
      return {
        ...cardEstadistica,
        valor: datosNumerosMensaje?.TotalEntregados || 0,
        cambio: tasaEntrega,
      };
    }

    if (cardEstadistica.titulo === 'Leidos') {
      return {
        ...cardEstadistica,
        valor: datosNumerosMensaje?.TotalLeidos || 0,
        cambio: tasaLeidos,
      };
    }

    if (cardEstadistica.titulo === 'Fallidos') {
      return {
        ...cardEstadistica,
        valor: datosNumerosMensaje?.TotalFallidos || 0,
        cambio: tasaFallidos,
      };
    }
    return cardEstadistica;
  });
}

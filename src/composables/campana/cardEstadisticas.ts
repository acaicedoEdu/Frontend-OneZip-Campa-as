import { useCampanaStore } from 'src/stores/campana.store';
import { type CardEstadisticas } from 'src/types/cardEstadisticas';
import { cardEstadisticas } from 'src/constants/CardEstadisticas';

export function obtenerDatosCardEstadisticas(): CardEstadisticas[] {
  const campanaStore = useCampanaStore();
  const datosNumerosMensaje = campanaStore.campana?.DatosNumerosMensaje;

  return cardEstadisticas.map((cardEstadistica) => {
    if (cardEstadistica.titulo === 'Total Enviados') {
      return {
        ...cardEstadistica,
        valor: datosNumerosMensaje?.TotalEnviados || 0,
        totalDestinatarios: datosNumerosMensaje?.TotalDestinatarios || 0,
      };
    }

    return cardEstadistica;
  });
}

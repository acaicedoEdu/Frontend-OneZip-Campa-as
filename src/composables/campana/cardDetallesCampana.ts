import { useCampanaStore } from 'src/stores/campana.store';
import { type CardDetallesCampana } from 'src/types/cardDetallesCampana';
import { cardDetallesCampana } from 'src/constants/cardDetallesCampana';
import { diferenciaXHora } from '../diferenciaXHora';

export function obtenerDatosCardDetallesCampana(): CardDetallesCampana[] {
  const campanaStore = useCampanaStore();
  const campana = campanaStore.campana?.Campana || null;
  const grupo = campanaStore.campana?.Grupo || null;
  const contactosIndividuales = campanaStore.campana?.ContactosIndividuales || null;
  const duracionCampana =
    campana?.FechaInicio && campana.FechaFin
      ? diferenciaXHora(campana?.FechaInicio, campana?.FechaFin)
      : null;

  return cardDetallesCampana.map((cardDetalleCampana) => {
    if (cardDetalleCampana.titulo === 'Plantilla') {
      return {
        ...cardDetalleCampana,
        valor: [campanaStore.campana?.Plantilla.Nombre || ''],
      };
    }

    if (cardDetalleCampana.titulo === 'Grupo') {
      return {
        ...cardDetalleCampana,
        valor: [String(grupo?.Nombre || '') || ''],
      };
    }

    if (cardDetalleCampana.titulo === 'Contactos individuales') {
      return {
        ...cardDetalleCampana,
        valor: [String(contactosIndividuales?.length || '')],
      };
    }

    if (cardDetalleCampana.titulo === 'Duración') {
      return {
        ...cardDetalleCampana,
        valor: [duracionCampana || '...'],
      };
    }
    return cardDetalleCampana;
  });
}

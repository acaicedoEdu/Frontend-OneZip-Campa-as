import { useCampanaStore } from 'src/stores/campana.store';
import { type SeriesTimeLine } from 'src/types/seriesGrafico';
import { seriesTimeline } from 'src/constants/graficoTimelineMostrarIdCampana';

export function obtenerDatosseriesTimeline(): SeriesTimeLine[] {
  const campanaStore = useCampanaStore();
  const campana = campanaStore.campana || null;
  const datosTimeLineMensaje = campana?.DatosTimeLineMensaje || null;

  const dataEntregados: [string, number][] = datosTimeLineMensaje?.Entregados?.map(
    (data) => [String(data.Fecha), data.Total] as [string, number],
  ) ?? [['', 0]];

  const dataEnviados: [string, number][] = datosTimeLineMensaje?.Enviados?.map(
    (data) => [String(data.Fecha), data.Total] as [string, number],
  ) ?? [['', 0]];

  const dataLeidos: [string, number][] = datosTimeLineMensaje?.Leidos?.map(
    (data) => [String(data.Fecha), data.Total] as [string, number],
  ) ?? [['', 0]];

  const dataFallidos: [string, number][] = datosTimeLineMensaje?.Fallidos?.map(
    (data) => [String(data.Fecha), data.Total] as [string, number],
  ) ?? [['', 0]];

  return seriesTimeline.map((serieTimeline) => {
    if (serieTimeline.name === 'Entregados') {
      return {
        ...serieTimeline,
        data: dataEntregados,
      };
    }
    if (serieTimeline.name === 'Enviados') {
      return {
        ...serieTimeline,
        data: dataEnviados,
      };
    }
    if (serieTimeline.name === 'Leídos') {
      return {
        ...serieTimeline,
        data: dataLeidos,
      };
    }
    if (serieTimeline.name === 'Fallidos') {
      return {
        ...serieTimeline,
        data: dataFallidos,
      };
    }
    return serieTimeline;
  });
}

import { useCampanaStore } from 'src/stores/campana.store';

export function obtenerSeriesDonuChart(): number[] {
  const campanaStore = useCampanaStore();
  const datosNumerosMensaje = campanaStore.campana?.DatosNumerosMensaje;
  return [
    datosNumerosMensaje?.TotalEnviados || 0,
    datosNumerosMensaje?.TotalEntregados || 0,
    datosNumerosMensaje?.TotalLeidos || 0,
    datosNumerosMensaje?.TotalFallidos || 0,
  ];
}

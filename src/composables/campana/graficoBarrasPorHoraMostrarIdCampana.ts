import { type OptionsBar } from 'src/types/optionsGrafico';
import { graficoBarrasPorHoraMostrarIdCampana } from 'src/constants/graficoBarrasPorHoraMostrarIdCampana';
import { useCampanaStore } from 'src/stores/campana.store';
import { computed } from 'vue';

const campanaStore = useCampanaStore();
const campana = computed(() => campanaStore.campana || null);
const datosTimeLineMensaje = computed(() => campana.value?.DatosTimeLineMensaje || null);

export const series = () => [
  {
    name: 'Enviados',
    data: datosTimeLineMensaje.value?.Enviados?.map((item) => item.Total) || [],
  },
  {
    name: 'Entregados',
    data: datosTimeLineMensaje.value?.Entregados?.map((item) => item.Total) || [],
  },
  {
    name: 'Leídos',
    data: datosTimeLineMensaje.value?.Leidos?.map((item) => item.Total) || [],
  },
];

export function graficoBarrasPorHora(): OptionsBar {
  return {
    ...graficoBarrasPorHoraMostrarIdCampana,
    xaxis: {
      categories: datosTimeLineMensaje.value?.Enviados?.map((item) => {
        const date = new Date(item.Fecha);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      }) || [''],
    },
  };
}

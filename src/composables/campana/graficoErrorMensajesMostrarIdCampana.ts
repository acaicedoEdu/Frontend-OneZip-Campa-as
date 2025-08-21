import { type OptionsBar } from 'src/types/optionsGrafico';
import { graficoErrorMensajesMostrarIdCampana } from 'src/constants/graficoErrorMensajesMostrarIdCampana';
import { useCampanaStore } from 'src/stores/campana.store';
import { computed } from 'vue';

const campanaStore = useCampanaStore();
const campana = computed(() => campanaStore.campana || null);
const datosMensajeFallido = computed(() => campana.value?.DatosMensajeFallido || null);

export const series = () => [
  {
    name: 'Cantidad',
    data: datosMensajeFallido.value?.map((item) => item.Cantidad) || [0],
  },
];

export function graficoErrorMensajes(): OptionsBar {
  return {
    ...graficoErrorMensajesMostrarIdCampana,
    xaxis: {
      categories: datosMensajeFallido.value?.map((item) => item.Tipo) || ['...'],
    },
  };
}

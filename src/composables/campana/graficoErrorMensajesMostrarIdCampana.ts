import { type OptionsBar } from 'src/types/optionsGrafico';
import { graficoBarrasPorHoraMostrarIdCampana } from 'src/constants/graficoBarrasPorHoraMostrarIdCampana';

const errorTypes = [
  { type: 'Número inválido', count: 45, color: '#ef4444' },
  { type: 'Usuario bloqueado', count: 18, color: '#f97316' },
  { type: 'Límite de rate', count: 9, color: '#eab308' },
];

export const series = () => [
  {
    name: 'Cantidad',
    data: errorTypes.map((item) => item.count),
  },
];

export const graficoErrorMensajes: OptionsBar = {
  ...graficoBarrasPorHoraMostrarIdCampana,
  xaxis: {
    categories: errorTypes.map((item) => item.type),
  },
};

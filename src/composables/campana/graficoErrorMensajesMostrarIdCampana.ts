import { type OptionsBar } from 'src/types/optionsGrafico';
import { graficoErrorMensajesMostrarIdCampana } from 'src/constants/graficoErrorMensajesMostrarIdCampana';

const errorTypes = [
  { type: 'Número inválido', count: 45 },
  { type: 'Usuario bloqueado', count: 18 },
  { type: 'Límite de rate', count: 9 },
];

export const series = () => [
  {
    name: 'Cantidad',
    data: errorTypes.map((item) => item.count),
  },
];

export const graficoErrorMensajes: OptionsBar = {
  ...graficoErrorMensajesMostrarIdCampana,
  xaxis: {
    categories: errorTypes.map((item) => item.type),
  },
};

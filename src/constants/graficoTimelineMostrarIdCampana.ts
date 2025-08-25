import type { SeriesTimeLine } from 'src/types/seriesGrafico';
import type { OptionsLine } from 'src/types/optionsGrafico';

export const seriesTimeline: SeriesTimeLine[] = [
  {
    name: 'Enviados',
    data: [],
  },
  {
    name: 'Entregados',
    data: [],
  },
  {
    name: 'Leídos',
    data: [],
  },
  {
    name: 'Fallidos',
    data: [],
  },
];

export const graficoTimeline: OptionsLine = {
  chart: {
    height: '300',
    type: 'line',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false,
    },
  },
};

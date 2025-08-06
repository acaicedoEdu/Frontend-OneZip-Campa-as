import type { SeriesTimeLine } from 'src/types/seriesGrafico';
import type { OptionsLine } from 'src/types/optionsGrafico';

export const seriesTimeline: SeriesTimeLine[] = [
  {
    name: 'Entregados',
    data: [
      ['2024-01-15T10:30:00.000Z', 31],
      ['2024-01-15T10:45:00.000Z', 420],
      ['2024-01-15T11:00:00.000Z', 890],
      ['2024-01-15T11:15:00.000Z', 1050],
      ['2024-01-15T11:30:00.000Z', 1178],
    ],
  },
  {
    name: 'Leídos',
    data: [
      ['2024-01-15T10:30:00.000Z', 10],
      ['2024-01-15T10:45:00.000Z', 250],
      ['2024-01-15T11:00:00.000Z', 550],
      ['2024-01-15T11:15:00.000Z', 780],
      ['2024-01-15T11:30:00.000Z', 892],
    ],
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
  },
};

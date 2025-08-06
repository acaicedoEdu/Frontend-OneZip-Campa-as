import type { Series } from 'src/types/seriesGrafico';
import type { OptionsBar } from 'src/types/optionsGrafico';

export const series: Series[] = [
  {
    name: 'Mensajes Enviados',
    data: [44, 55, 57, 56, 61, 58, 63],
  },
];

export const grafico: OptionsBar = {
  chart: {
    type: 'bar',
    height: '378',
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  },
  yaxis: {
    title: {
      text: 'Nº de Mensajes',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: number) {
        return val + ' mensajes';
      },
    },
  },
};

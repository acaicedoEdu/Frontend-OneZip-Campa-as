import { type OptionsBar } from 'src/types/optionsGrafico';

export const graficoBarrasPorHoraMostrarIdCampana: OptionsBar = {
  chart: {
    type: 'bar',
    height: '350',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '60%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#10b981', '#8b5cf6'],
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    title: {
      text: 'Mensajes',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val) => `${val} mensajes`,
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
};

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
  colors: ['#1e88e5', '#43a047', '#8e24aa'],
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

import { type OptionsBar } from 'src/types/optionsGrafico';

export const graficoErrorMensajesMostrarIdCampana: OptionsBar = {
  chart: {
    type: 'bar',
    height: '300',
    toolbar: { show: false },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      distributed: false,
    },
  },
  colors: ['#ef4444'],
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [],
  },
  yaxis: {},
  legend: {
    show: false,
  },
};

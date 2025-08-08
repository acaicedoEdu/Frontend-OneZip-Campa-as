import type { OptionsDonut } from 'src/types/optionsGrafico';

export const graficoDonuChart: OptionsDonut = {
  chart: {
    type: 'donut',
    height: '320',
    toolbar: {
      show: false,
    },
  },
  labels: ['Enviados', 'Entregados', 'Leídos', 'Fallidos'],
  colors: ['#3b82f6', '#10b981', '#8b5cf6', '#ef4444'],
  legend: {
    position: 'bottom',
  },
  stroke: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

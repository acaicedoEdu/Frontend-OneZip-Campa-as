import { type OptionsBar } from 'src/types/optionsGrafico';
import { graficoBarrasPorHoraMostrarIdCampana } from 'src/constants/graficoBarrasPorHoraMostrarIdCampana';

const timelineData = [
  { time: '10:30', sent: 0, delivered: 0, read: 0 },
  { time: '10:45', sent: 250, delivered: 235, read: 45 },
  { time: '11:00', sent: 500, delivered: 478, read: 156 },
  { time: '11:15', sent: 750, delivered: 720, read: 298 },
  { time: '11:30', sent: 1000, delivered: 965, read: 456 },
  { time: '11:45', sent: 1250, delivered: 1150, read: 678 },
  { time: '12:00', sent: 1250, delivered: 1178, read: 789 },
  { time: '12:15', sent: 1250, delivered: 1178, read: 834 },
  { time: '12:30', sent: 1250, delivered: 1178, read: 867 },
  { time: '12:45', sent: 1250, delivered: 1178, read: 892 },
];

export const series = () => [
  {
    name: 'Entregados',
    data: timelineData.map((item) => item.delivered),
  },
  {
    name: 'Leídos',
    data: timelineData.map((item) => item.read),
  },
];

export const graficoBarrasPorHora: OptionsBar = {
  ...graficoBarrasPorHoraMostrarIdCampana,
  xaxis: {
    categories: timelineData.map((item) => item.time),
  },
};

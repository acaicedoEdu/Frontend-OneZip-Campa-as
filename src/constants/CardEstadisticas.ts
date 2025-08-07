import type { CardEstadisticas } from 'src/types/cardEstadisticas';

export const cardEstadisticas: CardEstadisticas[] = [
  {
    titulo: 'Total Enviados',
    valor: 0,
    cambio: 0,
    icono: 'fa-solid fa-paper-plane',
    color: 'blue',
    estiloCambio: 'percent',
    totalDestinatarios: 0,
  },
  {
    titulo: 'Entregados',
    valor: 0,
    cambio: 0,
    icono: 'fa-solid fa-check',
    color: 'green',
    estiloCambio: 'percent',
    labelCambio: 'tasa de entrega',
  },
  {
    titulo: 'Leidos',
    valor: 0,
    cambio: 0,
    icono: 'fa-solid fa-eye',
    color: 'purple',
    estiloCambio: 'percent',
    labelCambio: 'tasa de lectura',
  },
  {
    titulo: 'Fallidos',
    valor: 0,
    cambio: 0,
    icono: 'fa-solid fa-xmark',
    color: 'red',
    estiloCambio: 'percent',
    labelCambio: 'tasa de error',
  },
];

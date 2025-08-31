import { defineStore } from 'pinia';
import type { PropsAlertaConfirmacion } from 'src/types/propsAlertaConfirmacion';

interface AlertaConfirmacion {
  dialog: boolean;
  alertaConfirmacion: PropsAlertaConfirmacion;
}

export const useAlertaConfirmacion = defineStore('AlertaConfirmacion', {
  state: (): AlertaConfirmacion => ({
    dialog: false,
    alertaConfirmacion: {} as PropsAlertaConfirmacion,
  }),

  actions: {
    toggleDialogAlertaConfirmacion() {
      this.dialog = !this.dialog;
    },
    setAlertaConfirmacion(alertaConfirmacion: PropsAlertaConfirmacion) {
      this.alertaConfirmacion = alertaConfirmacion;
    },
  },
});

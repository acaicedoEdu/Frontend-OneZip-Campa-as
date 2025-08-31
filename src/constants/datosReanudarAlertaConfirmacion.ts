import type { PropsAlertaConfirmacion } from 'src/types/propsAlertaConfirmacion';
import { useCampanaStore } from 'src/stores/campana.store';

export const datosReanudarAlertaConfirmacion: PropsAlertaConfirmacion = {
  iconoTitulo: 'fa-solid fa-triangle-exclamation',
  titulo: 'Reanudar campaña',
  mainDescripcion: '¿Estás seguro de que deseas reanudar esta campaña?',
  iconoInformacionOpcional: 'fa-solid fa-rocket',
  informacionOpcionalTexto1: 'Campaña a reanudar:',
  nombreCampana: '',
  informacionOpcionalTexto2: 'Los mensajes que no se hayan enviado se ejecutarán.',
  nombreBotonCancelar: 'No, mantener pausada',
  nombreBotonEjecutar: 'Sí, reanudar campaña',
  iconoBotonEjecutar: 'fa-solid fa-play',
  color: 'green',
  accion: async (idCampana: number) => {
    if (!idCampana) return;
    await useCampanaStore().desPausarCampana(idCampana);
  },
};

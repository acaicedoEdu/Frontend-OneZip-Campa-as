import type { PropsAlertaConfirmacion } from 'src/types/propsAlertaConfirmacion';
import { useCampanaStore } from 'src/stores/campana.store';

export const datosCancelarAlertaConfirmacion: PropsAlertaConfirmacion = {
  iconoTitulo: 'fa-solid fa-triangle-exclamation',
  titulo: 'Cancelar campaña',
  mainDescripcion:
    '¿Estás seguro de que deseas cancelar esta campaña? Esta acción no se puede deshacer.',
  iconoInformacionOpcional: 'fa-solid fa-rocket',
  informacionOpcionalTexto1: 'Campaña a cancelar:',
  nombreCampana: '',
  informacionOpcionalTexto2: 'Los mensajes que no se hayan enviado aún serán cancelados.',
  nombreBotonCancelar: 'No, mantener campaña',
  nombreBotonEjecutar: 'Sí, cancelar campaña',
  iconoBotonEjecutar: 'fa-solid fa-xmark',
  color: 'red',
  accion: async (idCampana: number) => {
    if (!idCampana) return;
    await useCampanaStore().cancelarCampana(idCampana);
  },
};

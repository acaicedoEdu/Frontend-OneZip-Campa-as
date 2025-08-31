export interface PropsAlertaConfirmacion {
  iconoTitulo: string;
  titulo: string;
  mainDescripcion: string;
  iconoInformacionOpcional: string;
  informacionOpcionalTexto1: string;
  nombreCampana: string;
  idCampana?: number;
  informacionOpcionalTexto2: string;
  nombreBotonCancelar: string;
  nombreBotonEjecutar: string;
  iconoBotonEjecutar: string;
  color: string;
  accion: (idCampana: number) => Promise<void>;
}

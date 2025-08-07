import { type Campana } from './campana';
import { type Plantilla } from './plantilla';

interface DatosNumerosMensaje {
  TotalEnviados: number;
  TotalEntregados: number;
  TotalLeidos: number;
  TotalFallidos: number;
  TotalDestinatarios: number;
}

export interface IdCampana {
  Campana: Campana;
  DatosNumerosMensaje: DatosNumerosMensaje;
  Plantilla: Plantilla;
  MensajeError: string;
}

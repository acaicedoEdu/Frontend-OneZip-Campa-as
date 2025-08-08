import { type Campana } from './campana';
import { type Plantilla } from './plantilla';
import { type Grupo } from './grupo';
import { type Contacto } from './contacto';

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
  Grupo: Grupo;
  ContactosIndividuales: Contacto[];
}

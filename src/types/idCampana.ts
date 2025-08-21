import { type Campana } from './campana';
import { type Plantilla } from './plantilla';
import { type Grupo } from './grupo';
import { type Contacto } from './contacto';

interface DatosMensajeFallido {
  Tipo: string;
  Cantidad: number;
}

interface AnalisisMensaje {
  MejorMinutoEntrega: string;
  PromedioLectura: string;
}

interface DatosNumerosMensaje {
  TotalEnviados: number;
  TotalEntregados: number;
  TotalLeidos: number;
  TotalFallidos: number;
  TotalDestinatarios: number;
}

interface DatosTimeLineMensaje {
  Enviados: { Item1: Date; Item2: number }[];
  Entregados: { Item1: Date; Item2: number }[];
  Leidos: { Item1: Date; Item2: number }[];
  Fallidos: { Item1: Date; Item2: number }[];
}

export interface IdCampana {
  Campana: Campana;
  DatosNumerosMensaje: DatosNumerosMensaje;
  Plantilla: Plantilla;
  MensajeError: string;
  Grupo: Grupo;
  ContactosIndividuales: Contacto[];
  DatosTimeLineMensaje: DatosTimeLineMensaje;
  AnalisisMensaje: AnalisisMensaje;
  DatosMensajeFallido: DatosMensajeFallido[];
}

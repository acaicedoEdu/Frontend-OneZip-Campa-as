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
  Enviados: { Fecha: Date; Total: number }[];
  Entregados: { Fecha: Date; Total: number }[];
  Leidos: { Fecha: Date; Total: number }[];
  Fallidos: { Fecha: Date; Total: number }[];
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

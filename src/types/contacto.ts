import { type CampoPersonalizadoContacto } from './campopersonalizadocontacto';

export interface Contacto {
  IdContacto?: number;
  idGrupo?: number;
  IdAplicacion?: number;
  Telefono: string;
  IdEstado?: number;
  FechaCreacion?: string;
  CampoPersonalizado?: CampoPersonalizadoContacto[];
}

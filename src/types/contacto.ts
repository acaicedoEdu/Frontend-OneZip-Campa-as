import { type CampoPersonalizadoContacto } from './campopersonalizadocontacto';

export interface Contacto {
  id?: number;
  idGrupo?: number;
  idAplicacion?: number;
  telefono: string;
  idEstado?: number;
  fechaCreacion?: string;
  campoPersonalizado?: CampoPersonalizadoContacto[];
}

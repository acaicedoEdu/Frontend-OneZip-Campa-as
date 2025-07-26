import { type CampoPersonalizadoContacto } from './campopersonalizadocontacto';

export interface Contacto {
  idContacto?: number;
  idGrupo?: number;
  idAplicacion?: number;
  telefono: string;
  idEstado?: number;
  fechaCreacion?: string;
  campoPersonalizado?: CampoPersonalizadoContacto[];
}

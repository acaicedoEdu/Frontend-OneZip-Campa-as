export interface Campana {
  IdCampana?: number;
  IdAplicacion: number;
  IdPlantilla?: number;
  IdGrupo?: number;
  Nombre: string;
  FechaInicio?: Date;
  FechaFin?: Date;
  IdEstado?: number;
  TipoEnvio: string;
  Contenido?: string;
  TipoContenido: string;
  FechaCreacion?: Date;
  FechaModificacion?: Date;
}

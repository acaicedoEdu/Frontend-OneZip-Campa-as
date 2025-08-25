export interface Campana {
  IdCampana?: number;
  IdAplicacion: number;
  IdPlantilla: number;
  NombrePlantilla: string;
  IdGrupo?: number;
  NombreGrupo?: string;
  Nombre: string;
  FechaInicio?: Date | string;
  FechaFin?: Date | string;
  NumDestinatarios?: number;
  NumEnviados?: number;
  NumEntregados?: number;
  NumLeidos?: number;
  NumFallidos?: number;
  IdEstado?: number;
  TipoEnvio: string;
  FechaCreacion?: Date;
  FechaModificacion?: Date;
}

export interface Grupo {
  IdGrupo: number;
  Nombre: string;
  Descripcion: string;
  FuenteCarga: string;
  FechaCarga: Date;
  TotalContactos?: number;
  IdEstado?: number;
  IdAplicacion: number;
  FechaModificacion: Date;
}

export interface Grupo {
  IdGrupo: number;
  Nombre: string;
  Descripcion: string;
  FuenteCarga: string;
  FechaCarga: string;
  TotalContactos?: number;
  IdEstado?: number;
  IdAplicacion: number;
}

export interface Respuesta<T> {
  IsExito: boolean;
  Mensaje: string;
  Dato: T;
}

export interface RespuestaMensaje {
  IsExito: boolean;
  Mensaje: string;
}

export interface RespuestaPaginacion<T> {
  IsExito: boolean;
  Mensaje: string;
  Dato: T;
  Tamano: number;
  TotalPaginas: number;
  Pagina: number;
  TotalDatos: number;
}

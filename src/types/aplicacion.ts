export interface Aplicacion {
  IdAplicacion: number;
  Nombre: string;
  Telefono: string;
  IdentificadorTelefono: string;
  IdEstado?: number;
  FechaCreacion?: Date;
  FechaModificacion?: Date;
}

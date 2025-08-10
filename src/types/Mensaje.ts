import { type Contacto } from './contacto';

export interface Mensaje {
  IdMensaje: number;
  IdCampana: number;
  IdContacto: number;
  IdPlantilla: number;
  IdEstado: number;
  MensajeError: string;
  FechaEnvio: Date;
  FechaEntrega: Date;
  FechaLectura: Date;
  FechaCreacion: Date;
  Intentos: number;
  Contacto: Contacto;
}

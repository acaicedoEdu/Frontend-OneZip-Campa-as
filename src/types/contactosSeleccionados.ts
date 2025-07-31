import { type Contacto } from 'src/types/contacto';

export interface ContactosSeleccionados {
  idGrupo?: number;
  contactosSeleccionados?: Contacto[];
}

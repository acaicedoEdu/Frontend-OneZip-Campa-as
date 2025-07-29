export interface LinkNavegacion {
  titulo: string;
  icono: string;
  link: string;
  descripcion?: string;
  botones?: BotonNavegacion[];
}

interface BotonNavegacion {
  titulo: string;
  icono: string;
  link?: string;
  principal: boolean;
  opciones?: OpcionBotonNavegacion[];
}

interface OpcionBotonNavegacion {
  titulo: string;
  icono: string;
}

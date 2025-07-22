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
  link: string;
  principal: boolean;
  funcion?: () => void;
}

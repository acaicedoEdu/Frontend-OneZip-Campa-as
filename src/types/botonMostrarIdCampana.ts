interface spanBotonMostrarIdCampana {
  clase: string;
  valor: string;
}

export interface BotonMostrarIdCampana {
  IdBoton: number;
  IdEstado: number;
  outline: boolean;
  clase: string;
  icono: string;
  loading: boolean;
  link?: string;
  span: spanBotonMostrarIdCampana;
  accion?: (idCampana: number) => Promise<void> | void;
}

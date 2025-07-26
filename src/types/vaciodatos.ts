export interface VacioDatos {
  pagina: string;
  titulo: string;
  descripcion: string;
  puntos: Punto[];
  botones?: Boton[];
}

export interface Punto {
  titulo: string;
  descripcion: string;
  icono: string;
  color: string;
}

export interface Boton {
  titulo: string;
  icono: string;
  color: string;
  link?: string;
  funcion?: CallableFunction;
}

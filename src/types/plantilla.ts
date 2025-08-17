export interface Plantilla {
  IdPlantilla?: number;
  Nombre: string;
  Contenido: {
    textoEncabezado: string;
    mensajePrincipal: string;
    textoFooter: string;
  };
  fechaCreacion?: string;
  fechaModificacion?: string;
}

export interface Plantilla {
  idPlantilla?: number;
  Nombre: string;
  Contenido: {
    textoEncabezado: string;
    mensajePrincipal: string;
    textoFooter: string;
  };
  fechaCreacion?: string;
  fechaModificacion?: string;
}

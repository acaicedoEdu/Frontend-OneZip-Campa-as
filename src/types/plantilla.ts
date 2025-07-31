export interface Plantilla {
  idPlantilla?: number;
  nombre: string;
  contenido: {
    textoEncabezado: string;
    mensajePrincipal: string;
    textoFooter: string;
  };
  fechaCreacion?: string;
  fechaModificacion?: string;
}

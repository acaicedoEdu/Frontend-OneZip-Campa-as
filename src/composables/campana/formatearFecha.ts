export const formatearFecha = (fecha: Date | null): string => {
  if (fecha) {
    const formateada = fecha
      ? {
          anio: new Date(fecha).getFullYear(),
          mes: String(new Date(fecha).getMonth() + 1).padStart(2, '0'),
          dia: String(new Date(fecha).getDate()).padStart(2, '0'),
          hora: String(new Date(fecha).getHours()).padStart(2, '0'),
          minutos: String(new Date(fecha).getMinutes()).padStart(2, '0'),
        }
      : null;

    return formateada
      ? `${formateada?.anio}-${formateada?.mes}-${formateada?.dia} ${formateada?.hora}:${formateada?.minutos}`
      : '-';
  } else {
    return '-';
  }
};

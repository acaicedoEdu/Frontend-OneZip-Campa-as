export function diferenciaXHora(start: Date, end: Date): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffMs = endDate.getTime() - startDate.getTime(); // diferencia en milisegundos

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = '';
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0) {
    result += `${minutes}min `;
  }
  if (seconds > 0 || result === '') {
    result += `${seconds}s`;
  }

  return result.trim();
}

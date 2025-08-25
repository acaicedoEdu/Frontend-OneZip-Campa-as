import { boot } from 'quasar/wrappers';
import type { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $hubConnection: HubConnection;
  }
}

const conexionSignalR: HubConnection = new HubConnectionBuilder()
  .withUrl('https://localhost:55604/')
  .withAutomaticReconnect()
  .build();

export default boot(({ app }) => {
  app.config.globalProperties.$signalR = conexionSignalR;

  app.provide('signalR', conexionSignalR);

  conexionSignalR
    .start()
    .then(() => {
      console.log('Conexión SignalR iniciada correctamente');
    })
    .catch((error) => {
      console.error('Error al iniciar la conexión SignalR:', error);
    });
});

export { conexionSignalR };

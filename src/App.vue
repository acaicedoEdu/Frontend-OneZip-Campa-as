<template>
  <router-view />
</template>

<script setup lang="ts">
// import { onMounted, onUnmounted } from 'vue';
// import { conexionSignalR } from './boot/signalr';
// import { useCampanaStore } from 'src/stores/campana.store';

// const campanaStore = useCampanaStore();

// const manejarCampana = (tipoMensaje: string, idCampana: number = 0) => {
//   switch (tipoMensaje) {
//     case 'mensaje':
//       campanaStore.fetchIdCampana(true, idCampana).catch((error) => {
//         console.error('Error al obtener la campana:', error);
//       });
//       break;

//     case 'campaña':
//       campanaStore.fetchCampanas(true).catch((error) => {
//         console.error('Error al obtener la campañas:', error);
//       });
//       break;

//     default:
//       console.warn(`Tipo de mensaje no reconocido: ${tipoMensaje}`);
//       break;
//   }
// };

// onMounted(() => {
//   conexionSignalR.on('recibirMensaje', manejarCampana);
// });

// onUnmounted(() => {
//   conexionSignalR.off('recibirMensaje', manejarCampana);
// });
</script>

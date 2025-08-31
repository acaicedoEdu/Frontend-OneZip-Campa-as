<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { conexionSignalR } from './boot/signalr';
import { useCampanaStore } from 'src/stores/campana.store';
import { useMensajeStore } from './stores/mensaje.store';
import { useAlertaConfirmacion } from 'src/stores/alertaConfirmacion.store';
import { useRoute } from 'vue-router';

const campanaStore = useCampanaStore();
const mensajeStore = useMensajeStore();
const alertaConfirmacionStore = useAlertaConfirmacion();
const route = useRoute();

const manejarCampana = (tipoMensaje: string, idCampana: number = 0) => {
  const existe = route.params.id as string;

  const existeNumero = Number(existe);
  switch (tipoMensaje) {
    case 'mensaje':
      if (!isNaN(existeNumero)) {
        if (existeNumero == idCampana) {
          campanaStore.fetchIdCampana(true, idCampana).catch((error) => {
            console.error('Error al obtener la campana:', error);
          });
          mensajeStore.fetchMensajes(idCampana, true).catch((error) => {
            console.error('Error al obtener los mensajes:', error);
          });
        }
      } else {
        campanaStore.fetchIdCampana(true, idCampana).catch((error) => {
          console.error('Error al obtener la campana:', error);
        });
        mensajeStore.fetchMensajes(idCampana, true).catch((error) => {
          console.error('Error al obtener los mensajes:', error);
        });
      }
      break;

    case 'campaña':
      if (alertaConfirmacionStore.dialog) alertaConfirmacionStore.toggleDialogAlertaConfirmacion();
      campanaStore.fetchCampanasXAplicacion(true).catch((error) => {
        console.error('Error al obtener la campañas:', error);
      });
      if (idCampana > 0) {
        if (!isNaN(existeNumero)) {
          if (existeNumero == idCampana) {
            campanaStore.fetchIdCampana(true, idCampana).catch((error) => {
              console.error('Error al obtener la campana:', error);
            });
          }
        } else {
          campanaStore.fetchIdCampana(true, idCampana).catch((error) => {
            console.error('Error al obtener la campana:', error);
          });
        }
      }
      break;

    case 'mensajeError':
      campanaStore.fetchIdCampana(true, idCampana).catch((error) => {
        console.error('Error al obtener la campana:', error);
      });
      mensajeStore.fetchMensajes(idCampana, true).catch((error) => {
        console.error('Error al obtener los mensajes:', error);
      });
      mensajeStore.fetchMensajesError(idCampana, true).catch((error) => {
        console.error('Error al obtener los mensajes de error:', error);
      });
      break;

    default:
      console.warn(`Tipo de mensaje no reconocido: ${tipoMensaje}`);
      break;
  }
};

onMounted(() => {
  conexionSignalR.on('recibirMensaje', manejarCampana);
});

onUnmounted(() => {
  conexionSignalR.off('recibirMensaje', manejarCampana);
});
</script>

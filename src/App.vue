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
import {
  showErrorNotification,
  showSuccessNotification,
} from 'src/components/notificacion/notificacion';
import type { RespuestaMensaje } from './types/Respuesta';

const campanaStore = useCampanaStore();
const mensajeStore = useMensajeStore();
const alertaConfirmacionStore = useAlertaConfirmacion();
const route = useRoute();

const manejarCampana = (
  tipoMensaje: string,
  idCampana: number = 0,
  notificacionMensaje: RespuestaMensaje,
) => {
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

      if (notificacionMensaje.Mensaje.trim().length > 0) {
        if (notificacionMensaje.IsExito) {
          showSuccessNotification(notificacionMensaje.Mensaje);
        } else {
          showErrorNotification(notificacionMensaje.Mensaje);
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

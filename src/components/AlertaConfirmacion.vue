<template>
  <q-dialog
    :model-value="valorModelo"
    @before-hide="
      alertaConfirmacionStore.dialog && alertaConfirmacionStore.toggleDialogAlertaConfirmacion()
    "
    persistent
  >
    <q-card style="width: 500px; max-width: 90vw; border-radius: 12px">
      <q-card-section class="row items-center q-pb-none">
        <q-icon
          :name="datosAlertaConfirmacion.iconoTitulo"
          :color="datosAlertaConfirmacion.color"
          size="md"
          class="q-mr-sm"
        />
        <div class="text-h6 text-weight-bold">{{ datosAlertaConfirmacion.titulo }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <p>{{ datosAlertaConfirmacion.mainDescripcion }}</p>

        <q-banner
          rounded
          dense
          :class="`bg-${datosAlertaConfirmacion.color}-1 text-${datosAlertaConfirmacion.color}-9`"
        >
          <template v-slot:avatar>
            <q-icon :name="datosAlertaConfirmacion.iconoInformacionOpcional" />
          </template>
          <div>
            <span class="text-weight-bold">{{
              datosAlertaConfirmacion.informacionOpcionalTexto1
            }}</span>
            {{ datosAlertaConfirmacion.nombreCampana }}
          </div>
          <div class="text-caption">{{ datosAlertaConfirmacion.informacionOpcionalTexto2 }}</div>
        </q-banner>
      </q-card-section>

      <q-card-actions class="q-pa-md row q-gutter-md">
        <q-btn
          outline
          no-caps
          :label="datosAlertaConfirmacion.nombreBotonCancelar"
          color="grey-8"
          v-close-popup
          class="col"
          padding="10px"
        />
        <q-btn
          unelevated
          no-caps
          :color="datosAlertaConfirmacion.color"
          :icon="datosAlertaConfirmacion.iconoBotonEjecutar"
          :label="datosAlertaConfirmacion.nombreBotonEjecutar"
          class="col"
          padding="10px"
          @click="
            datosAlertaConfirmacion.idCampana &&
            datosAlertaConfirmacion.accion(datosAlertaConfirmacion.idCampana)
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlertaConfirmacion } from 'src/stores/alertaConfirmacion.store';

const alertaConfirmacionStore = useAlertaConfirmacion();

const valorModelo = computed(() => alertaConfirmacionStore.dialog);

const datosAlertaConfirmacion = computed(() => alertaConfirmacionStore.alertaConfirmacion);
</script>

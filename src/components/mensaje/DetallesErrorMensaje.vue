<template>
  <div class="row q-col-gutter-lg">
    <div class="col-12 col-lg-6">
      <q-card flat bordered class="full-height">
        <q-card-section>
          <div class="text-h6">Tipos de Error</div>
        </q-card-section>
        <q-card-section>
          <MostrarGrafico
            :type="graficoErrorMensajes.chart.type"
            :height="graficoErrorMensajes.chart.height"
            :options="graficoErrorMensajes"
            :series="series()"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-lg-6">
      <q-card flat bordered class="full-height">
        <q-card-section>
          <div class="text-h6">Mensajes Fallidos</div>
        </q-card-section>
        <q-scroll-area style="height: 32em">
          <q-card-section class="q-gutter-y-md">
            <div
              v-for="message in failedMessages"
              :key="message.id"
              class="failed-message-item q-pa-md"
            >
              <div class="row items-start justify-between">
                <div>
                  <div class="text-weight-bold">{{ message.name }}</div>
                  <div class="text-grey-7">{{ message.phone }}</div>
                </div>
                <q-chip square dense color="negative" text-color="white" label="Fallido" />
              </div>

              <div class="row items-center text-negative q-mt-sm">
                <q-icon name="warning" class="q-mr-xs" />
                <span>{{ message.error }}</span>
              </div>

              <div class="text-caption text-grey-6 q-mt-xs">Enviado: {{ message.sent }}</div>
            </div>
          </q-card-section>
        </q-scroll-area>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MostrarGrafico from 'src/components/MostrarGrafico.vue';
import {
  graficoErrorMensajes,
  series,
} from 'src/composables/campana/graficoErrorMensajesMostrarIdCampana';

const failedMessages = ref([
  {
    id: 1,
    name: 'Carlos López',
    phone: '+34 600 345 678',
    error: 'Número inválido o fuera de servicio',
    sent: '2024-01-15 10:32:17',
  },
  {
    id: 2,
    name: 'Carlos López',
    phone: '+34 600 345 678',
    error: 'Número inválido o fuera de servicio',
    sent: '2024-01-15 10:32:17',
  },
  {
    id: 3,
    name: 'Carlos López',
    phone: '+34 600 345 678',
    error: 'Número inválido o fuera de servicio',
    sent: '2024-01-15 10:32:17',
  },
  {
    id: 4,
    name: 'Carlos López',
    phone: '+34 600 345 678',
    error: 'Número inválido o fuera de servicio',
    sent: '2024-01-15 10:32:17',
  },
  {
    id: 5,
    name: 'Carlos López',
    phone: '+34 600 345 678',
    error: 'Número inválido o fuera de servicio',
    sent: '2024-01-15 10:32:17',
  },
  {
    id: 6,
    name: 'Carlos López',
    phone: '+34 600 345 678',
    error: 'Número inválido o fuera de servicio',
    sent: '2024-01-15 10:32:17',
  },
]);
</script>

<style scoped>
.failed-message-item {
  background-color: #fff1f1;
  border-left: 4px solid #ef4444;
  border-radius: 4px;
}
</style>

<template>
  <q-page>
    <div class="q-pa-md q-pa-lg-lg">
      <div class="row q-col-gutter-lg">
        <div v-for="stat in stats" :key="stat.title" class="col-12 col-sm-6 col-md-3">
          <q-card flat bordered>
            <q-card-section>
              <div class="row items-start justify-between">
                <div class="text-grey-8">{{ stat.title }}</div>
                <q-avatar
                  :icon="stat.icon"
                  :color="`${stat.color}-1`"
                  :text-color="`${stat.color}-7`"
                  size="md"
                />
              </div>
              <NumberFlow
                class="text-h4 text-weight-bold q-mt-sm"
                :value="stat.value"
                :format="{ notation: 'standard' }"
                :duration="1000"
              />
              <div :class="stat.changeSign === '+' ? 'text-positive' : 'text-negative'">
                {{ stat.changeSign }}
                <NumberFlow
                  locales="es-ES"
                  :value="stat.change"
                  :format="{
                    style: stat.styleNumberFlow === 'percent' ? 'percent' : 'decimal',
                    notation: 'standard',
                  }"
                  :duration="1000"
                />
                desde ayer
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mt-md">
        <div class="col-12 col-lg-7">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Actividad de los Últimos 7 Días</div>
              <div class="text-grey-7">Mensajes enviados por día</div>
            </q-card-section>
            <q-card-section>
              <MostrarGrafico />
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-lg-5">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Campañas Recientes</div>
              <div class="text-grey-7">Últimas 5 campañas ejecutadas</div>
            </q-card-section>
            <q-card-section class="q-py-none">
              <q-list>
                <q-item
                  v-for="campaign in recentCampaigns"
                  :key="campaign.title"
                  style="border: 1px solid #e5e7eb; border-radius: 8px"
                  class="q-pa-md q-mb-md main-background"
                >
                  <q-item-section>
                    <q-item-label class="text-weight-medium">{{ campaign.title }}</q-item-label>
                    <q-item-label caption>{{ campaign.details }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div class="row items-center">
                      <q-chip
                        dense
                        :class="`${campaign.statusColor} ${campaign.status == 'Completada' ? 'verde-texto' : campaign.status == 'Enviando' ? 'azul-texto' : campaign.status == 'Fallida' ? 'rojo-texto' : 'text-grey-7'}`"
                        :label="campaign.status"
                        :style="`border: 1px solid ${campaign.status == 'Completada' ? '#bbf7d0' : campaign.status == 'Enviando' ? '#bfdbfe' : campaign.status == 'Fallida' ? '#fecaca' : '#e5e7eb'};`"
                      />
                      <q-btn
                        flat
                        round
                        dense
                        icon="fa-solid fa-eye"
                        color="grey-9"
                        class="q-ml-sm"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MostrarGrafico from 'src/components/MostrarGrafico.vue';
import NumberFlow from '@number-flow/vue';

const stats = ref([
  {
    title: 'Mensajes Enviados Hoy',
    value: 2441,
    change: 0.12,
    icon: 'fa-solid fa-message',
    color: 'blue',
    styleNumberFlow: 'percent',
    changeSign: '+',
  },
  {
    title: 'Tasa de Entrega',
    value: 94.2,
    change: 0.02,
    icon: 'fa-solid fa-arrow-trend-up',
    color: 'green',
    styleNumberFlow: 'percent',
    changeSign: '+',
  },
  {
    title: 'Campañas Activas',
    value: 8,
    change: 3,
    icon: 'fa-solid fa-rocket',
    color: 'purple',
    styleNumberFlow: 'standard',
    changeSign: '+',
  },
  {
    title: 'Errores',
    value: 23,
    change: 5,
    icon: 'fa-solid fa-exclamation-triangle',
    color: 'red',
    styleNumberFlow: 'standard',
    changeSign: '-',
  },
]);

const recentCampaigns = ref([
  {
    title: 'Promoción Black Friday',
    details: '1250 destinatarios • 2024-01-15',
    status: 'Completada',
    statusColor: 'verde-suave',
  },
  {
    title: 'Recordatorio de Cita',
    details: '89 destinatarios • 2024-01-15',
    status: 'Enviando',
    statusColor: 'azul-suave',
  },
  {
    title: 'Bienvenida Nuevos Clientes',
    details: '45 destinatarios • 2024-01-14',
    status: 'Completada',
    statusColor: 'verde-suave',
  },
  {
    title: 'Encuesta de Satisfacción',
    details: '320 destinatarios • 2024-01-14',
    status: 'Fallida',
    statusColor: 'rojo-suave',
  },
  {
    title: 'Oferta Especial',
    details: '890 destinatarios • 2024-01-13',
    status: 'Completada',
    statusColor: 'verde-suave',
  },
]);
</script>

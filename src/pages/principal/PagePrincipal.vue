<template>
  <q-page>
    <div class="q-pa-md q-pa-lg-lg">
      <CardEstadisticas :stats="estadisticas" componentePadre="PagePrincipal" />

      <div class="row q-col-gutter-lg q-mt-md">
        <div class="col-12 col-lg-7">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">Actividad de los Últimos 7 Días</div>
              <div class="text-grey-7">Mensajes enviados por día</div>
            </q-card-section>
            <q-card-section>
              <MostrarGrafico
                :type="grafico.chart.type"
                :height="grafico.chart.height"
                :options="grafico"
                :series="series"
              />
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
                        size="10px"
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
import { grafico, series } from 'src/constants/graficoPrincipal';
import CardEstadisticas from 'src/components/principal/CardEstadisticas.vue';

const estadisticas = ref([
  {
    titulo: 'Mensajes Enviados Hoy',
    valor: 2141,
    cambio: 0.12,
    icono: 'fa-solid fa-message',
    color: 'blue',
    estiloCambio: 'percent',
    signoCambio: '+',
  },
  {
    titulo: 'Tasa de Entrega',
    valor: 94.2,
    cambio: 0.02,
    icono: 'fa-solid fa-arrow-trend-up',
    color: 'green',
    estiloCambio: 'percent',
    signoCambio: '+',
  },
  {
    titulo: 'Campañas Activas',
    valor: 8,
    cambio: 3,
    icono: 'fa-solid fa-rocket',
    color: 'purple',
    estiloCambio: 'standard',
    signoCambio: '+',
  },
  {
    titulo: 'Errores',
    valor: 23,
    cambio: 5,
    icono: 'fa-solid fa-exclamation-triangle',
    color: 'red',
    estiloCambio: 'standard',
    signoCambio: '-',
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

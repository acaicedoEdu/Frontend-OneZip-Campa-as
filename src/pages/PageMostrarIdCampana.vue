<template>
  <q-page class="q-px-md q-pt-none">
    <div class="row items-center justify-between q-mb-md">
      <div class="row items-center">
        <q-btn
          flat
          dense
          to="/campana"
          label="Volver a Campañas"
          class="secondary-text text-weight-regular"
          no-caps
          icon="fa-solid fa-arrow-left"
        />
        <div class="column flex-center q-ml-sm">
          <div class="text-h5 text-weight-bold row items-center q-gutter-sm">
            <span>Promoción Black Friday</span>
            <q-chip
              dense
              color="green-2"
              text-color="green-8"
              size="15px"
              class="text-weight-medium"
              label="Completada"
            />
          </div>
          <div class="text-grey-7">Creada: 2024-01-15 10:30 · Completada: 2024-01-15 12:45</div>
        </div>
      </div>
      <div class="q-gutter-sm self-end">
        <q-btn unelevated no-caps class="soft-text bg-white" outline padding="8px 13px">
          <q-icon name="fa-solid fa-file-arrow-down text-dark" size="13px" />
          <span class="text-subtitle2 q-ml-sm text-dark">Exportar Reporte</span>
        </q-btn>
        <q-btn unelevated no-caps class="verde-principal text-white" padding="8px 13px">
          <q-icon name="fa-solid fa-arrows-rotate text-white" size="13px" />
          <span class="text-white text-subtitle2 q-ml-sm">Actualizar</span>
        </q-btn>
      </div>
    </div>

    <CardEstadisticas :stats="estadisticas" componentePadre="PageMostrarIdCampana" />

    <q-tabs v-model="tab" align="left" class="q-mt-lg" no-caps>
      <q-tab name="resumen" label="Resumen" />
      <q-tab name="mensajes" label="Mensajes (3)" />
      <q-tab name="analisis" label="Análisis" />
      <q-tab name="errores" label="Errores (72)" />
    </q-tabs>
    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="resumen" class="q-pa-none q-pt-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-12 col-lg-7 q-gutter-y-lg">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6">Detalles de la Campaña</div>
              </q-card-section>
              <q-card-section>
                <q-list>
                  <q-item v-for="detalle in cardDetallesCampana" :key="detalle.titulo">
                    <q-item-section>
                      <q-item-label>{{ detalle.titulo }}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ detalle.valor }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6">Mensaje enviado:</div>
              </q-card-section>
            </q-card>
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6">Timeline de Entrega</div>
                <div class="text-grey-7">
                  Progreso de envío, entrega y lectura a lo largo del tiempo
                </div>
              </q-card-section>
              <q-card-section>
                <MostrarGrafico
                  :type="graficoTimeline.chart.type"
                  :height="graficoTimeline.chart.height"
                  :options="graficoTimeline"
                  :series="seriesTimeline"
                />
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-lg-5">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-h6">Distribución de Estados</div>
              </q-card-section>
              <q-card-section>
                <MostrarGrafico
                  :type="graficoDonuChart.chart.type"
                  :height="graficoDonuChart.chart.height"
                  :options="graficoDonuChart"
                  :series="seriesDonuChart"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="mensajes"> ... </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MostrarGrafico from 'src/components/MostrarGrafico.vue';
import { graficoDonuChart, seriesDonuChart } from 'src/constants/graficoDonuChartMostrarIdCampana';
import { graficoTimeline, seriesTimeline } from 'src/constants/graficoTimelineMostrarIdCampana';
import { useRoute } from 'vue-router';
import CardEstadisticas from 'src/components/principal/CardEstadisticas.vue';
import { cardDetallesCampana } from 'src/constants/cardDetallesCampana';

const route = useRoute();

const tab = ref('resumen');

const idCampana = ref('');

const estadisticas = ref([
  {
    titulo: 'Total Enviados',
    valor: 1250,
    cambio: 0.12,
    icono: 'fa-solid fa-paper-plane',
    color: 'blue',
    estiloCambio: 'percent',
    totalDestinatarios: 1250,
  },
  {
    titulo: 'Entregados',
    valor: 1178,
    cambio: 0.95,
    icono: 'fa-solid fa-check',
    color: 'green',
    estiloCambio: 'percent',
    labelCambio: 'tasa de entrega',
  },
  {
    titulo: 'Leidos',
    valor: 892,
    cambio: 0.71,
    icono: 'fa-solid fa-eye',
    color: 'purple',
    estiloCambio: 'percent',
    labelCambio: 'tasa de lectura',
  },
  {
    titulo: 'Fallidos',
    valor: 23,
    cambio: 0.18,
    icono: 'fa-solid fa-xmark',
    color: 'red',
    estiloCambio: 'percent',
    labelCambio: 'tasa de error',
  },
]);

onMounted(() => {
  idCampana.value = route.params.id as string;
});
</script>

<template>
  <q-page padding>
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-lg-7">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-h6">Rendimiento por Hora</div>
          </q-card-section>
          <q-card-section>
            <MostrarGrafico
              :type="graficoBarrasPorHora.chart.type"
              :height="graficoBarrasPorHora.chart.height"
              :options="graficoBarrasPorHora"
              :series="series()"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-lg-5">
        <q-card flat bordered class="full-height">
          <q-card-section>
            <div class="text-h6">Métricas Clave</div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-y-md">
              <div v-for="metric in metricasProgreso" :key="metric.label">
                <div class="row items-center">
                  <div class="col-4 text-grey-8">{{ metric.label }}</div>
                  <div class="col q-px-sm">
                    <q-linear-progress
                      rounded
                      size="10px"
                      :value="metric.value / 100"
                      :color="metric.color"
                    />
                  </div>
                  <div class="col-2 text-right text-weight-medium">{{ metric.value }}%</div>
                </div>
              </div>
            </div>

            <q-separator class="q-my-lg" />

            <q-list dense separator>
              <q-item v-for="stat in estadisticas" :key="stat.label">
                <q-item-section>
                  <q-item-label class="text-grey-8">{{ stat.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-weight-bold">{{ stat.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import MostrarGrafico from 'src/components/MostrarGrafico.vue';
import {
  graficoBarrasPorHora,
  series,
} from 'src/composables/campana/graficoBarrasPorHoraMostrarIdCampana';
import { useCampanaStore } from 'src/stores/campana.store';

const campanaStore = useCampanaStore();

const metricasProgreso = computed(() => {
  return [
    {
      label: 'Tasa de Entrega',
      value: campanaStore.campana?.DatosNumerosMensaje.TotalEntregados || 0,
      color: 'green',
    },
    {
      label: 'Tasa de Lectura',
      value: campanaStore.campana?.DatosNumerosMensaje.TotalLeidos || 0,
      color: 'purple',
    },
    {
      label: 'Tasa de Error',
      value: campanaStore.campana?.DatosNumerosMensaje.TotalFallidos || 0,
      color: 'red',
    },
  ];
});

const estadisticas = ref([
  { label: 'Tiempo promedio de lectura:', value: '15 minutos' },
  { label: 'Mejor hora de entrega:', value: '11:30 AM' },
  { label: 'Velocidad de envío:', value: '9.3 msg/min' },
]);
</script>

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
              :type="graficoBarrasPorHora().chart.type"
              :height="graficoBarrasPorHora().chart.height"
              :options="graficoBarrasPorHora()"
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
import { computed } from 'vue';
import MostrarGrafico from 'src/components/MostrarGrafico.vue';
import {
  graficoBarrasPorHora,
  series,
} from 'src/composables/campana/graficoBarrasPorHoraMostrarIdCampana';
import { useCampanaStore } from 'src/stores/campana.store';
import { diferenciaXHora } from 'src/composables/diferenciaXHora';

const campanaStore = useCampanaStore();

const metricasProgreso = computed(() => {
  return [
    {
      label: 'Tasa de Entrega',
      value: Number(
        Number(
          ((campanaStore.campana?.DatosNumerosMensaje.TotalEntregados || 0) /
            (campanaStore.campana?.DatosNumerosMensaje.TotalDestinatarios || 0)) *
            100,
        ).toFixed(1),
      ),
      color: 'green',
    },
    {
      label: 'Tasa de Lectura',
      value: Number(
        Number(
          ((campanaStore.campana?.DatosNumerosMensaje.TotalLeidos || 0) /
            (campanaStore.campana?.DatosNumerosMensaje.TotalDestinatarios || 0)) *
            100,
        ).toFixed(1),
      ),
      color: 'purple',
    },
    {
      label: 'Tasa de Error',
      value: Number(
        Number(
          ((campanaStore.campana?.DatosNumerosMensaje.TotalFallidos || 0) /
            (campanaStore.campana?.DatosNumerosMensaje.TotalDestinatarios || 0)) *
            100,
        ).toFixed(1),
      ),
      color: 'red',
    },
  ];
});

const convertirDuracion = (duracionStr: string) => {
  const match = duracionStr.match(/(\d+)\s*(s|min|h)/i);
  if (!match) return 0;
  if (match) {
    const value = parseInt(match[1] ?? '0', 10);
    const unit = match[2] ?? ' '.toLowerCase();

    switch (unit) {
      case 's':
        return value;
      case 'min':
        return value * 60;
      case 'h':
        return value * 3600;
      default:
        return 0;
    }
  }
};

const estadisticas = computed(() => {
  let destinatariosPorMinuto: number = 0;
  if (campanaStore.campana?.Campana.FechaInicio && campanaStore.campana?.Campana.FechaFin) {
    const duracionStr = diferenciaXHora(
      new Date(campanaStore.campana?.Campana.FechaInicio),
      new Date(campanaStore.campana?.Campana.FechaFin),
    );

    const duracionEnSegundos = convertirDuracion(duracionStr) || 0;
    const totalDestinatarios = campanaStore.campana?.DatosNumerosMensaje.TotalDestinatarios || 0;

    const base =
      duracionEnSegundos <= 60
        ? totalDestinatarios
        : (totalDestinatarios / duracionEnSegundos) * 60;

    // Redondear SIEMPRE hacia arriba a 1 decimal
    destinatariosPorMinuto = Math.ceil(base * 10) / 10;
  }

  return [
    {
      label: 'Tiempo promedio de lectura:',
      value: `${campanaStore.campana?.AnalisisMensaje.PromedioLectura || '...'}`,
    },
    {
      label: 'Mejor hora de entrega:',
      value: `${campanaStore.campana?.AnalisisMensaje.MejorMinutoEntrega || '...'}`,
    },
    {
      label: 'Velocidad de envío:',
      value: `${destinatariosPorMinuto} mensajes/minuto`,
    },
  ];
});
</script>

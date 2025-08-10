<template>
  <q-page class="q-px-md q-pt-none">
    <div v-if="mensajeError != null" class="row flex-center">
      <span>No existe la campaña</span>
    </div>
    <div v-else>
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
          <div class="column item-start justify-center q-ml-sm">
            <div class="text-h5 text-weight-bold row q-gutter-sm">
              <span>{{ campana?.Nombre }}</span>
              <q-chip
                dense
                :color="`${colorEstado}-2`"
                :text-color="`${colorEstado}-8`"
                size="15px"
                class="text-weight-medium"
                :label="estado"
              />
            </div>
            <div class="text-grey-7">
              Creada: {{ fechaCreacionFormateada }} · Completada: {{ fechaFinFormateada }}
            </div>
          </div>
        </div>
        <div class="q-gutter-x-sm row items-center justify-between">
          <q-btn
            v-for="boton in botonesMostrarIdCampana.filter((d) => d.IdEstado == campana?.IdEstado)"
            :key="boton.IdBoton"
            unelevated
            no-caps
            :class="boton.clase"
            padding="5px 8px"
            :outline="boton.outline"
          >
            <q-icon :name="boton.icono" size="13px" />
            <span :class="boton.span.clase">{{ boton.span.valor }}</span>
          </q-btn>
        </div>
      </div>

      <CardEstadisticas
        :stats="obtenerDatosCardEstadisticas()"
        componentePadre="PageMostrarIdCampana"
      />

      <q-tabs v-model="tab" align="left" class="q-mt-lg" no-caps>
        <q-tab name="resumen" label="Resumen" />
        <q-tab
          name="mensajes"
          :label="`Mensajes (${campanaStore.campana?.DatosNumerosMensaje.TotalDestinatarios})`"
        />
        <q-tab name="analisis" label="Análisis" />
        <q-tab
          name="errores"
          :label="`Errores${campanaStore.campana && campanaStore.campana?.DatosNumerosMensaje.TotalFallidos > 0 ? ` (${campanaStore.campana.DatosNumerosMensaje.TotalFallidos})` : ''}`"
        />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="resumen" class="q-pa-none q-pt-lg">
          <div class="column q-col-gutter-md">
            <div class="row col-5 q-col-gutter-md">
              <div class="col-12 col-md-6 column">
                <DetallesXCampana />
                <q-card flat bordered class="q-mt-md">
                  <q-card-section class="q-pb-none">
                    <div class="text-h6">Mensaje de la plantilla:</div>
                  </q-card-section>
                  <q-card-section>
                    <MostrarMensajePlantilla
                      :nombre="campanaStore.campana?.Plantilla.Nombre || ''"
                      :headerText="campanaStore.campana?.Plantilla.Contenido.textoEncabezado || ''"
                      :messageBody="
                        campanaStore.campana?.Plantilla.Contenido.mensajePrincipal || ''
                      "
                      :footerText="campanaStore.campana?.Plantilla.Contenido.textoFooter || ''"
                    />
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-6">
                <q-card flat bordered class="full-height">
                  <q-card-section>
                    <div class="text-h6">Distribución de Estados</div>
                  </q-card-section>
                  <q-card-section>
                    <MostrarGrafico
                      :type="graficoDonuChart.chart.type"
                      :height="graficoDonuChart.chart.height"
                      :options="graficoDonuChart"
                      :series="obtenerSeriesDonuChart()"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <div class="col-12">
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
                    :series="obtenerDatosseriesTimeline()"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="mensajes">
          <MostrarMensajes />
        </q-tab-panel>
        <q-tab-panel name="analisis">
          <MostrarAnalisisXIdCampana />
        </q-tab-panel>
        <q-tab-panel name="errores">
          <DetallesErrorMensaje />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import MostrarGrafico from 'src/components/MostrarGrafico.vue';
import { graficoDonuChart } from 'src/constants/graficoDonuChartMostrarIdCampana';
import { graficoTimeline } from 'src/constants/graficoTimelineMostrarIdCampana';
import { obtenerDatosseriesTimeline } from 'src/composables/campana/graficoTimelineMostrarIdCampana';
import { useRoute, useRouter } from 'vue-router';
import CardEstadisticas from 'src/components/principal/CardEstadisticas.vue';
import { useAplicacionStore } from 'src/stores/aplicacion.store';
import { useCampanaStore } from 'src/stores/campana.store';
import { obtenerDatosCardEstadisticas } from 'src/composables/campana/cardEstadisticas';
import type { Campana } from 'src/types/campana';
import { botonesMostrarIdCampana } from 'src/constants/botonMostrarIdCampana';
import DetallesXCampana from 'src/components/campana/DetallesXCampana.vue';
import MostrarMensajePlantilla from 'src/components/plantilla/MostrarMensajePlantilla.vue';
import { obtenerSeriesDonuChart } from 'src/composables/campana/graficoDonuChartMostrarIdCampana';
import MostrarMensajes from 'src/components/mensaje/MostrarMensajes.vue';
import MostrarAnalisisXIdCampana from 'src/components/campana/MostrarAnalisisXIdCampana.vue';
import DetallesErrorMensaje from 'src/components/mensaje/DetallesErrorMensaje.vue';

const route = useRoute();
const aplicacionStore = useAplicacionStore();
const campanaStore = useCampanaStore();

const tab = ref('resumen');

const campana = computed<Campana | null>(() => campanaStore.campana?.Campana || null);
const mensajeError = computed<string | null>(() => campanaStore.campana?.MensajeError || null);
const fechaCreacionFormateada = computed(() => {
  const fecha = campana.value?.FechaCreacion ? new Date(campana.value?.FechaCreacion) : null;

  const formateada = fecha
    ? {
        anio: fecha.getFullYear(),
        mes: String(fecha.getMonth() + 1).padStart(2, '0'),
        dia: String(fecha.getDate()).padStart(2, '0'),
        hora: String(fecha.getHours()).padStart(2, '0'),
        minutos: String(fecha.getMinutes()).padStart(2, '0'),
      }
    : null;

  return `${formateada?.anio}-${formateada?.mes}-${formateada?.dia} ${formateada?.hora}:${formateada?.minutos}`;
});
const fechaFinFormateada = computed(() => {
  const fecha = campana.value?.FechaFin ? new Date(campana.value?.FechaFin) : null;

  const formateada = fecha
    ? {
        anio: fecha.getFullYear(),
        mes: String(fecha.getMonth() + 1).padStart(2, '0'),
        dia: String(fecha.getDate()).padStart(2, '0'),
        hora: String(fecha.getHours()).padStart(2, '0'),
        minutos: String(fecha.getMinutes()).padStart(2, '0'),
      }
    : null;

  return formateada
    ? `${formateada?.anio}-${formateada?.mes}-${formateada?.dia} ${formateada?.hora}:${formateada?.minutos}`
    : '...';
});
const estado = computed(() => {
  const estado = campana.value?.IdEstado;

  return estado == 3
    ? 'Procesando'
    : estado == 6
      ? 'Programada'
      : estado == 7
        ? 'Pausada'
        : estado == 9
          ? 'Cancelada'
          : estado == 8
            ? 'Completada'
            : estado == 10
              ? 'Error'
              : '...';
});
const colorEstado = computed(() => {
  const estado = campana.value?.IdEstado;

  return estado == 3
    ? 'blue'
    : estado == 6
      ? 'yellow'
      : estado == 7
        ? 'orange'
        : estado == 9
          ? 'red'
          : estado == 8
            ? 'green'
            : estado == 10
              ? 'negative'
              : 'grey';
});

const idCampana = ref('');
onMounted(async () => {
  idCampana.value = route.params.id as string;

  const idCampanaNumero = Number(idCampana.value);

  if (!isNaN(idCampanaNumero) && aplicacionStore.IdAplicacionEscogida > 0) {
    await campanaStore.fetchIdCampana(false, idCampanaNumero);
  } else {
    try {
      await useRouter().push('/campana');
    } catch (error) {
      console.log('Error redirigiendo a campañas:', error);
    }
  }
});
</script>

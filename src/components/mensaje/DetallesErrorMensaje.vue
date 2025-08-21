<template>
  <div class="row q-col-gutter-lg">
    <div class="col-12 col-lg-6">
      <q-card flat bordered class="full-height">
        <q-card-section>
          <div class="text-h6">Tipos de Error</div>
        </q-card-section>
        <q-card-section>
          <MostrarGrafico
            :type="graficoErrorMensajes().chart.type"
            :height="graficoErrorMensajes().chart.height"
            :options="graficoErrorMensajes()"
            :series="series()"
          />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-lg-6">
      <div class="full-height q-pa-md" style="border: 1px solid #0000001f; border-radius: 4px">
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h6">Mensajes Fallidos</div>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="textoBuscar"
            placeholder="Buscar teléfono..."
            style="width: 250px"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <q-scroll-area style="height: 32em">
          <q-table
            :rows="filtroMensajes"
            row-key="id"
            grid
            :loading="mensajeStore.loading || loadingTimeout"
            :pagination="paginacion"
            :filter="textoBuscar"
            rows-per-page-label="Filas por página"
            :rows-per-page-options="[10]"
            @request="activarPaginado"
          >
            <template v-slot:item="props">
              <q-card flat class="q-mb-md full-width">
                <q-card-section class="q-pa-none">
                  <div class="failed-message-item q-pa-md">
                    <div class="row items-start justify-between">
                      <div class="text-weight-bold">{{ props.row.celular }}</div>
                      <q-chip square dense color="negative" text-color="white" label="Fallido" />
                    </div>

                    <div class="row items-center text-negative q-mt-xs">
                      <q-icon name="warning" class="q-mr-xs" />
                      <span>{{ props.row.error }}</span>
                    </div>

                    <div class="text-caption text-grey-6 q-mt-xs">
                      Enviado: {{ props.row.envio }}
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </template>
            <template v-slot:no-data>
              <div class="full-width row flex-center text-grey-7 q-gutter-sm q-pa-xl">
                <q-icon size="2em" name="fa-solid fa-circle-info" />
                <span>No se encontraron resultados</span>
              </div>
            </template>
          </q-table>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import MostrarGrafico from 'src/components/MostrarGrafico.vue';
import {
  graficoErrorMensajes,
  series,
} from 'src/composables/campana/graficoErrorMensajesMostrarIdCampana';
import { useMensajeStore } from 'src/stores/mensaje.store';
import type { Paginacion, RequestProps } from 'src/types/paginacion';
import { useRoute } from 'vue-router';
import { formatearFecha } from 'src/composables/campana/formatearFecha';

const mensajeStore = useMensajeStore();
const textoBuscar = ref('');
let timeoutId: ReturnType<typeof setTimeout> | null = null;
const loadingTimeout = ref(false);
const route = useRoute();

const MensajesError = computed(() =>
  mensajeStore.mensajesError.map((mje) => ({
    id: mje.IdMensaje,
    celular: mje.Contacto.Telefono,
    error: mje.MensajeError,
    envio: formatearFecha(mje.FechaEnvio),
  })),
);

const paginacion = computed<Paginacion>(() => ({
  page: mensajeStore.paginaMensajesError,
  rowsPerPage: mensajeStore.tamanoMensajesError,
  rowsNumber: mensajeStore.totalMensajesError,
  sortBy: '',
  descending: false,
}));

const activarPaginado = async (props: RequestProps) => {
  const idCampanaNumero = Number(route.params.id as string);
  if (textoBuscar.value.trim()) {
    const busqueda = textoBuscar.value.toLowerCase().trim();
    await mensajeStore.buscarMensajes(
      idCampanaNumero,
      busqueda,
      true,
      props.pagination.page,
      props.pagination.rowsPerPage,
      true,
    );
  } else {
    await mensajeStore.fetchMensajesError(
      idCampanaNumero,
      true,
      props.pagination.page,
      props.pagination.rowsPerPage,
    );
  }
};

const filtroMensajes = computed(() => {
  let mensajes = MensajesError.value;

  if (textoBuscar.value.trim()) {
    if (mensajeStore.totalMensajesError <= 10) {
      const busqueda = textoBuscar.value.toLowerCase().trim();
      mensajes = mensajes.filter((msg) => msg.celular.includes(busqueda));
    }
  }

  return mensajes;
});

watch(
  () => textoBuscar.value,
  () => {
    if (mensajeStore.totalMensajesError >= 10) {
      if (timeoutId) clearTimeout(timeoutId);
      loadingTimeout.value = true;
      timeoutId = setTimeout(() => {
        void (async () => {
          const idCampanaNumero = Number(route.params.id as string);
          const busqueda = textoBuscar.value.toLowerCase().trim();
          loadingTimeout.value = false;
          if (busqueda) {
            await mensajeStore.buscarMensajes(idCampanaNumero, busqueda, true, 1, 10, true);
          } else {
            await mensajeStore.fetchMensajes(idCampanaNumero, true);
          }
        })();
      }, 500);
    }
  },
);
</script>

<style scoped>
.failed-message-item {
  background-color: #fff1f1;
  border-left: 4px solid #ef4444;
  border-radius: 4px;
}
</style>

<template>
  <div>
    <q-table
      :rows="plantillas"
      :columns="columnas"
      row-key="idPlantilla"
      grid
      :loading="false"
      v-model:pagination="paginacion"
      v-model:selected="plantillasSeleccionada"
      selection="single"
      :filter="textoBusqueda"
      class="my-sticky-header-table"
      icon-next-page="fa-solid fa-angle-right"
      icon-prev-page="fa-solid fa-angle-left"
      :rows-per-page-options="[6]"
      :selected-rows-label="(numberOfRows) => `${numberOfRows} plantilla seleccionada`"
    >
      <template v-slot:item="props">
        <div class="q-pa-md col-12 col-md-6 col-lg-4">
          <div
            class="cursor-pointer transition-card-plantilla card-plantilla"
            :style="props.selected ? 'transform: scale(0.95); border: 2px solid #22c55e;' : ''"
            @click="
              () => {
                props.selected = true;
              }
            "
          >
            <MostrarMensajePlantilla
              :nombre="props.row.nombre"
              :header-text="props.row.contenido.textoEncabezado"
              :message-body="props.row.contenido.mensajePrincipal"
              :footer-text="props.row.contenido.textoFooter"
            />
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import MostrarMensajePlantilla from 'src/components/plantilla/MostrarMensajePlantilla.vue';
import type { Plantilla } from 'src/types/plantilla';

const plantillas = ref<Plantilla[]>([
  {
    idPlantilla: 1,
    nombre: 'Prueba',
    contenido: {
      textoEncabezado: 'Encabezado',
      mensajePrincipal: 'Contenido {{1}}',
      textoFooter: 'Footer',
    },
    fechaCreacion: '2022-01-01',
    fechaModificacion: '2022-01-01',
  },
]);

interface Props {
  plantillasSeleccionada: Plantilla[];
}

const props = defineProps<Props>();

const emit = defineEmits(['update:plantillasSeleccionada']);

const plantillasSeleccionada = ref<Plantilla[]>(props.plantillasSeleccionada);
const textoBusqueda = ref('');
const paginacion = ref({
  rowsPerPage: 6,
});

interface Columnas {
  name: string;
  label: string;
  field: string;
}

const columnas: Columnas[] = [
  { label: 'Encabezado plantilla', name: 'textoEncabezado', field: 'textoEncabezado' },
  { label: 'Contenido plantilla', name: 'mensajePrincipal', field: 'mensajePrincipal' },
  { label: 'Footer plantilla', name: 'textoFooter', field: 'textoFooter' },
  { label: 'Fecha de Creación', name: 'fechaCreacion', field: 'fechaCreacion' },
  { label: 'Fecha de Modificación', name: 'fechaModificacion', field: 'fechaModificacion' },
];

watch(
  plantillasSeleccionada,
  (newVal) => {
    emit('update:plantillasSeleccionada', newVal);
  },
  { deep: true },
);
</script>

<style>
.transition-card-plantilla {
  transition:
    transform 0.28s,
    box-shadow 0.28s,
    border 0.28s !important;
}

.card-plantilla {
  box-sizing: border-box !important;
  border-radius: 12px;
}

.card-plantilla:hover {
  border: 1px solid #22c55e;
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
}
</style>

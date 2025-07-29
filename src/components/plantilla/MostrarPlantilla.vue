<template>
  <div>
    <q-table
      :rows="plantillas"
      :columns="columnas"
      row-key="IdGrupo"
      grid
      :loading="false"
      v-model:pagination="paginacion"
      v-model:selected="plantillasSeleccionada"
      selection="single"
      :filter="textoBusqueda"
      icon-next-page="fa-solid fa-angle-right"
      icon-prev-page="fa-solid fa-angle-left"
      :rows-per-page-options="[6]"
      :selected-rows-label="(numberOfRows) => `${numberOfRows} plantilla seleccionada`"
    >
      <template v-slot:item="props">
        <div class="q-pa-md col-12 col-md-6 col-lg-4 transition-card-contacto">
          <MostrarMensajePlantilla
            :header-text="props.row.textoEncabezado"
            :message-body="props.row.mensajePrincipal"
            :footer-text="props.row.textoFooter"
          />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MostrarMensajePlantilla from 'src/components/plantilla/MostrarMensajePlantilla.vue';

const plantillas = ref([
  {
    textoEncabezado: 'Encabezado',
    mensajePrincipal: 'Contenido {{1}}',
    textoFooter: 'Footer',
    FechaCreacion: '2022-01-01',
    FechaModificacion: '2022-01-01',
  },
  {
    textoEncabezado: '',
    mensajePrincipal: 'Contenido',
    textoFooter: 'Footer',
    FechaCreacion: '2022-01-01',
    FechaModificacion: '2022-01-01',
  },
  {
    textoEncabezado: 'Encabezado',
    mensajePrincipal: 'Contenido {{1}}',
    textoFooter: '',
    FechaCreacion: '2022-01-01',
    FechaModificacion: '2022-01-01',
  },
  {
    textoEncabezado: '',
    mensajePrincipal: 'Contenido {{1}}',
    textoFooter: '',
    FechaCreacion: '2022-01-01',
    FechaModificacion: '2022-01-01',
  },
]);
const plantillasSeleccionada = ref([]);
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
  { label: 'Fecha de Creación', name: 'FechaCreacion', field: 'FechaCreacion' },
  { label: 'Fecha de Modificación', name: 'FechaModificacion', field: 'FechaModificacion' },
];
</script>

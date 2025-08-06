<template>
  <div v-if="campanas.length === 0">
    <div v-if="campanaStore.loading" class="flex flex-center" style="height: 80vh">
      <q-spinner-oval color="primary" size="4em" />
    </div>
    <VacioDatos v-else pagina="campana" />
  </div>
  <div v-else class="q-pa-md q-pa-lg-lg">
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Campañas Masivas</div>
        <div class="text-grey-8">{{ campanas.length }} campañas masivas</div>
      </div>
      <q-space />
      <q-input
        outlined
        dense
        v-model="searchText"
        placeholder="Buscar campañas..."
        style="width: 250px"
      >
        <template v-slot:prepend
          ><q-icon name="fa-solid fa-magnifying-glass" size="18px"
        /></template>
      </q-input>
    </div>
    <q-table
      :rows="campanas"
      :columns="columnas"
      row-key="IdCampana"
      :loading="campanaStore.loading"
      v-model:pagination="pagination"
      :filter="searchText"
      icon-next-page="fa-solid fa-angle-right"
      icon-prev-page="fa-solid fa-angle-left"
      flat
      bordered
    >
      <template v-slot:no-data>
        <div class="full-width row flex-center text-grey-7 q-gutter-sm q-pa-xl">
          <q-icon size="2em" name="fa-solid fa-circle-info" />
          <span>No se encontraron resultados</span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCampanaStore } from 'src/stores/campana.store';
import { type Campana } from 'src/types/campana';
import VacioDatos from 'src/components/VacioDatos.vue';

const campanaStore = useCampanaStore();
const searchText = ref('');

const campanas = computed<Campana[]>(() => campanaStore.campanasXAplicacion);

// const campanas = ref([
//   {
//     IdCampana: 1,
//     Nombre: 'Campaña 1',
//     TipoEnvio: 'Tipo de envio 1',
//     IdPlantilla: 1,
//     IdGrupo: 1,
//     FechaInicio: '2022-01-01',
//     FechaFin: '2022-01-01',
//     IdEstado: 1,
//     FechaCreacion: '2022-01-01',
//     FechaModificacion: '2022-01-01',
//   },
// ]);

const pagination = ref({
  page: campanaStore.pagina,
  rowsPerPage: campanaStore.tamano,
});

interface Columnas {
  name: string;
  label: string;
  align: 'left' | 'right' | 'center';
  field: string;
}

const columnas: Columnas[] = [
  { label: 'Nombre de Campaña', name: 'Nombre', field: 'Nombre', align: 'left' },
  { label: 'Tipo de envio', name: 'TipoEnvio', field: 'TipoEnvio', align: 'left' },
  { label: 'Plantilla', name: 'IdPlantilla', field: 'IdPlantilla', align: 'left' },
  { label: 'Grupo', name: 'IdGrupo', field: 'IdGrupo', align: 'left' },
  { label: 'Fecha de Ejecución', name: 'FechaInicio', field: 'FechaInicio', align: 'left' },
  { label: 'Fecha de Fin', name: 'FechaFin', field: 'FechaFin', align: 'left' },
  { label: 'Estado', name: 'IdEstado', field: 'IdEstado', align: 'left' },
  { label: 'Fecha de Creación', name: 'FechaCreacion', field: 'FechaCreacion', align: 'left' },
  {
    label: 'Fecha de Modificación',
    name: 'FechaModificacion',
    field: 'FechaModificacion',
    align: 'left',
  },
];
</script>

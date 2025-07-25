<template>
  <div class="q-pa-md">
    <div v-if="grupos.length === 0">
      <VacioDatos pagina="grupo" />
    </div>
    <div v-else class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Grupos de Contactos</div>
        <div class="text-grey-8">{{ grupos.length }} grupos disponibles</div>
      </div>

      <q-space />

      <q-input
        outlined
        dense
        v-model="searchText"
        placeholder="Buscar grupos..."
        class="q-mr-sm"
        style="width: 250px"
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" size="18px" />
        </template>
      </q-input>
    </div>
    <q-table
      :rows="grupos"
      :columns="columnas"
      row-key="IdGrupo"
      grid
      :loading="grupoStore.loading"
      v-model:pagination="paginacion"
      v-model:selected="gruposSeleccionados"
      selection="multiple"
      :filter="searchText"
      icon-next-page="fa-solid fa-angle-right"
      icon-prev-page="fa-solid fa-angle-left"
      :rows-per-page-options="[6]"
      :selected-rows-label="(numberOfRows) => `${numberOfRows} contactos seleccionados`"
    >
      <template v-slot:item="props">
        <div
          class="q-pa-md col-12 col-md-6 col-lg-4 transition-card-contacto"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card flat bordered class="full-height cursor-pointer card-grupo">
            <q-card-section class="q-pb-xs row items-center no-wrap">
              <q-icon
                name="fa-regular fa-folder-open"
                color="green-5"
                size="18px"
                class="q-mr-sm"
              />
              <div class="ellipsis text-h6">{{ props.row.Nombre }}</div>
              <q-space />
              <q-btn-dropdown
                flat
                round
                dense
                no-icon-animation
                dropdown-icon="fa-solid fa-ellipsis-vertical"
                size="10px"
              >
                <q-list dense>
                  <q-item clickable v-close-popup>
                    <q-item-section side>
                      <q-icon name="fa-solid fa-trash-can" size="13px" color="red" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-red">Eliminar</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </q-card-section>

            <q-card-section class="q-py-none">
              <q-chip
                dense
                color="grey-2"
                size="13px"
                text-color="grey-8"
                :label="props.row.TotalContactos + ' contactos'"
              />
              <div class="q-pt-xs">{{ props.row.Descripcion }}</div>
            </q-card-section>

            <q-card-section class="q-pt-xs text-caption text-grey">
              <div>
                Creado: {{ props.row.FechaCarga }}
                <q-spinner-tail v-if="!props.row.FechaCarga" color="blue-grey" />
              </div>
              <div v-if="props.row.FechaModificacion">
                Actualizado: {{ props.row.FechaModificacion }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>
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
import { ref, computed, type ComputedRef } from 'vue';
import { useGrupoStore } from 'src/stores/grupo.store';
import VacioDatos from 'src/components/VacioDatos.vue';
import type { Grupo } from 'src/types/grupo';

const grupoStore = useGrupoStore();
const searchText = ref('');

const grupos: ComputedRef<Grupo[]> = computed(() => grupoStore.grupos);
const gruposSeleccionados = ref([]);
const paginacion = ref({
  page: grupoStore.pagina,
  rowsPerPage: grupoStore.tamano,
});

interface Columnas {
  name: string;
  label: string;
  field: string;
}

const columnas: Columnas[] = [
  { label: 'Nombre', name: 'Nombre', field: 'Nombre' },
  { label: 'Total de Contactos', name: 'TotalContactos', field: 'TotalContactos' },
  { label: 'Descripcion', name: 'Descripcion', field: 'Descripcion' },
  { label: 'Fecha de Creación', name: 'FechaCarga', field: 'FechaCarga' },
  { label: 'Fecha de Modificación', name: 'FechaModificacion', field: 'FechaModificacion' },
];
</script>

<style>
.card-grupo:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  border-color: #86efac !important;
}
</style>

<template>
  <div class="q-pa-md">
    <div v-if="grupos.length === 0">
      <VacioDatos pagina="grupo" />
    </div>
    <div v-else class="row items-center q-mb-lg">
      <div v-if="proops.componentePadre === 'PageGrupo'">
        <div class="text-h5 text-weight-bold">Grupos de Contactos</div>
        <div class="text-grey-8">{{ grupos.length }} grupos disponibles</div>
      </div>

      <q-space v-if="proops.componentePadre === 'PageGrupo'" />

      <q-input
        outlined
        dense
        v-model="searchText"
        placeholder="Buscar grupos..."
        style="width: 250px"
      >
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" size="18px" />
        </template>
      </q-input>
    </div>
    <q-table
      v-if="grupos.length > 0"
      :rows="grupos"
      :columns="columnas"
      row-key="IdGrupo"
      grid
      :loading="grupoStore.loading"
      :pagination="paginacion"
      v-model:selected="gruposSeleccionados"
      selection="single"
      :filter="searchText"
      :selected-rows-label="(numberOfRows) => `${numberOfRows} contactos seleccionados`"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[10]"
      @request="onRequest"
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
                v-if="proops.componentePadre === 'PageGrupo'"
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
              <q-checkbox v-else v-model="props.selected" />
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

            <q-card-section
              class="column flex-center"
              v-if="!props.row.FuenteCarga && !useContactoStore().loadingImportarContacto"
            >
              <q-avatar size="55px" color="green-1" text-color="green-7" icon="fa-solid fa-user" />
              <span class="text-subtitle2">¡Tu grupo está vacío!</span>
              <span class="text-caption text-grey-8 q-my-sm"
                >Agrega contactos para ejecutar tus campañas masivas</span
              >
              <q-btn
                unelevated
                no-caps
                class="verde-principal text-white"
                padding="6px 24px"
                @click="useContactoStore().toggleImportarContacto()"
              >
                <q-icon name="fa-solid fa-user text-white" class="q-mr-md" size="13px" />
                <span class="text-white text-subtitle2">Agregar contactos</span>
              </q-btn>
            </q-card-section>

            <q-spinner-tail v-if="useContactoStore().loadingImportarContacto" color="blue-grey" />
            <q-separator class="q-mt-md" />

            <div class="row justify-between">
              <q-card-section class="q-pt-sm text-caption text-grey">
                <div>
                  Creado: {{ props.row.FechaCarga }}
                  <q-spinner-tail v-if="!props.row.FechaCarga" color="blue-grey" />
                </div>
                <div v-if="props.row.FechaModificacion">
                  Actualizado: {{ props.row.FechaModificacion }}
                </div>
              </q-card-section>
              <q-card-section class="q-pt-sm">
                <div
                  v-if="props.row.FuenteCarga || useContactoStore().loadingImportarContacto"
                  class="text-caption text-grey"
                >
                  Fuente de carga: {{ props.row.FuenteCarga }}
                  <q-spinner-tail
                    v-if="useContactoStore().loadingImportarContacto"
                    color="blue-grey"
                  />
                </div>
              </q-card-section>
            </div>
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
import { ref, computed, watch } from 'vue';
import { useGrupoStore } from 'src/stores/grupo.store';
import VacioDatos from 'src/components/VacioDatos.vue';
import type { Grupo } from 'src/types/grupo';
import type { Paginacion, RequestProps } from 'src/types/paginacion';
import type { ContactosSeleccionados } from 'src/types/contactosSeleccionados';
import { useContactoStore } from 'src/stores/contacto.store';

const grupoStore = useGrupoStore();
const searchText = ref('');

interface LocalContactoSeleccionado {
  componentePadre: string;
  contactoSeleccionado?: ContactosSeleccionados;
}

const proops = defineProps<LocalContactoSeleccionado>();

const emit = defineEmits(['update:contactoSeleccionado']);

const obtenerContactosGrupo = computed(() => {
  return proops.contactoSeleccionado?.idGrupo
    ? grupoStore.getGrupoById(proops.contactoSeleccionado.idGrupo)
      ? ([grupoStore.getGrupoById(proops.contactoSeleccionado.idGrupo)] as Grupo[])
      : ([] as Grupo[])
    : ([] as Grupo[]);
});

const gruposSeleccionados = ref<Grupo[]>(obtenerContactosGrupo.value || []);

// const grupos = computed<Grupo[]>(() => grupoStore.grupos);

const grupos = ref<Grupo[]>([
  {
    IdGrupo: 1,
    Nombre: 'Grupo 1',
    Descripcion: 'Descripcion 1',
    IdAplicacion: 1,
    TotalContactos: 1,
    FechaCarga: new Date(),
    FechaModificacion: new Date(),
    FuenteCarga: 'Manual',
  },
  {
    IdGrupo: 2,
    Nombre: 'Grupo 2',
    Descripcion: 'Descripcion 2',
    IdAplicacion: 1,
    TotalContactos: 2,
    FechaCarga: new Date(),
    FechaModificacion: new Date(),
    FuenteCarga: 'Manual',
  },
]);

const paginacion = ref<Paginacion>({
  page: grupoStore.pagina,
  rowsPerPage: grupoStore.tamano,
  rowsNumber: grupoStore.totalPaginas,
  sortBy: '',
  descending: false,
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

watch(
  gruposSeleccionados,
  (newVal) => {
    emit('update:contactoSeleccionado', {
      idGrupo: newVal?.[0]?.IdGrupo,
    });
  },
  { deep: true },
);

const onRequest = (props: RequestProps) => {
  console.log('onRequest', props);
};
</script>

<style>
.card-grupo:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  border-color: #86efac !important;
}
</style>

<template>
  <div v-if="campanas.length === 0">
    <VacioDatos pagina="campana" />
  </div>
  <div v-else class="q-pa-md q-pa-lg-lg">
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Campañas Masivas</div>
        <div class="text-grey-8">{{ campanas.length }} campañas con campos personalizables</div>
      </div>
      <q-space />
      <q-input
        outlined
        dense
        v-model="searchText"
        placeholder="Buscar contactos..."
        class="q-mr-sm"
        style="width: 250px"
      >
        <template v-slot:prepend
          ><q-icon name="fa-solid fa-magnifying-glass" size="18px"
        /></template>
      </q-input>
      <q-btn
        unelevated
        outline
        no-caps
        default
        class="bg-white soft-text"
        padding="7px 24px"
        v-if="campanas.length > 0"
      >
        <q-icon name="fa-solid fa-user-plus" size="15px" class="text-grey-9" />
        <span class="text-weight-bold q-ml-sm text-grey-9">Añadir Contacto</span>
      </q-btn>
    </div>
    <q-table
      :rows="campanas"
      :columns="columnas"
      row-key="id"
      grid
      :loading="campanaStore.loading"
      v-model:pagination="pagination"
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
          <q-card
            flat
            bordered
            class="full-height card-contacto"
            :class="props.selected ? 'bg-blue-1' : ''"
          >
            <q-card-section class="row items-center no-wrap q-pb-none">
              <q-checkbox v-model="props.selected" />
              <q-avatar
                color="blue-grey-1"
                text-color="grey"
                icon="fa-solid fa-user"
                size="md"
                class="q-ml-sm"
              />
              <div class="q-ml-md">
                <div class="text-primary text-weight-medium" style="font-size: 16px">
                  {{ props.row.phone }}
                </div>
              </div>
              <q-space />
              <q-btn flat round dense color="grey-7" icon="fa-solid fa-ellipsis-vertical">
                <q-menu anchor="bottom right" self="top right">
                  <q-list dense style="min-width: 150px">
                    <q-item clickable v-close-popup
                      ><q-item-section>Editar Campos</q-item-section></q-item
                    >
                    <q-item clickable v-close-popup
                      ><q-item-section>Añadir a Grupo</q-item-section></q-item
                    >
                    <q-separator />
                    <q-item clickable v-close-popup class="text-negative"
                      ><q-item-section>Eliminar</q-item-section></q-item
                    >
                  </q-list>
                </q-menu>
              </q-btn>
            </q-card-section>

            <q-separator class="q-my-md" />

            <q-card-section class="q-pt-none q-px-md">
              <div
                v-for="field in props.row.fields"
                :key="field.label"
                class="row fit q-mb-sm"
                style="font-size: 14px"
              >
                <div class="col-4 text-grey-7">{{ field.label }}</div>
                <div class="col-8 text-grey-9 ellipsis">{{ field.value }}</div>
              </div>
            </q-card-section>

            <q-space />

            <q-card-section class="row items-center q-pt-none">
              <q-chip
                outline
                square
                color="grey-7"
                size="sm"
                :label="props.row.fields.length + ' campos'"
              />
              <q-space />
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
import type { ComputedRef } from 'vue';
import { ref, computed } from 'vue';
import { useCampanaStore } from 'src/stores/campana.store';
import { type Campana } from 'src/types/campana';
import VacioDatos from 'src/components/VacioDatos.vue';

const campanaStore = useCampanaStore();
const searchText = ref('');

const campanas: ComputedRef<Campana[]> = computed(() => campanaStore.campanasXAplicacion);
const pagination = ref({
  page: campanaStore.pagina,
  rowsPerPage: campanaStore.tamano,
});

interface Columnas {
  name: string;
  label: string;
  field: string;
}

const columnas: Columnas[] = [
  { label: 'Nombre de Campaña', name: 'Nombre', field: 'Nombre' },
  { label: 'Tipo de envio', name: 'TipoEnvio', field: 'TipoEnvio' },
  { label: 'Tipo de contenido', name: 'TipoContenido', field: 'TipoContenido' },
  { label: 'Contenido', name: 'Contenido', field: 'Contenido' },
  { label: 'Plantilla', name: 'IdPlantilla', field: 'IdPlantilla' },
  { label: 'Grupo', name: 'IdGrupo', field: 'IdGrupo' },
  { label: 'Fecha de Ejecución', name: 'FechaInicio', field: 'FechaInicio' },
  { label: 'Fecha de Fin', name: 'FechaFin', field: 'FechaFin' },
  { label: 'Estado', name: 'IdEstado', field: 'IdEstado' },
  { label: 'Fecha de Creación', name: 'FechaCreacion', field: 'FechaCreacion' },
  { label: 'Fecha de Modificación', name: 'FechaModificacion', field: 'FechaModificacion' },
];
</script>

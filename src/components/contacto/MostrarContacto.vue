<template>
  <div class="q-pa-md q-pa-lg-lg">
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">
          {{
            props.componentePadre == 'PageMostrarIdGrupo'
              ? 'Contactos del Grupo'
              : 'Contactos Individuales'
          }}
        </div>
        <div class="text-grey-8">
          {{ contactos.length }}
          {{
            props.componentePadre == 'PageMostrarIdGrupo'
              ? 'contactos en este grupo'
              : 'contactos individuales'
          }}
        </div>
      </div>
      <q-space />
      <q-input
        outlined
        dense
        v-model="searchText"
        placeholder="Buscar contactos..."
        class="bg-white"
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
        class="bg-white soft-text q-ml-sm"
        padding="7px 24px"
        v-if="contactos.length > 0"
      >
        <q-icon name="fa-solid fa-user-plus" size="15px" class="text-grey-9" />
        <span class="text-weight-bold q-ml-sm text-grey-9">Añadir Contacto</span>
      </q-btn>
    </div>
    <q-table
      :rows="contactos"
      :columns="columnas"
      row-key="Telefono"
      grid
      :loading="contactoStore.loading"
      v-model:pagination="pagination"
      v-model:selected="selectedContacts"
      selection="multiple"
      :filter="searchText"
      icon-next-page="fa-solid fa-angle-right"
      icon-prev-page="fa-solid fa-angle-left"
      :rows-per-page-options="[6]"
      :selected-rows-label="(numberOfRows) => `${numberOfRows} contactos seleccionados`"
    >
      <template v-slot:item="contacto">
        <div
          class="q-pa-md col-12 col-md-6 col-lg-4 transition-card-contacto"
          :style="contacto.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card
            flat
            bordered
            class="full-height card-contacto"
            :class="contacto.selected ? 'bg-blue-1' : ''"
          >
            <q-card-section
              :class="
                contacto.row.CampoPersonalizado && contacto.row.CampoPersonalizado.length > 0
                  ? 'row items-center no-wrap q-pb-none'
                  : 'row items-center no-wrap q-pb-md'
              "
            >
              <q-checkbox v-model="contacto.selected" />
              <q-avatar
                color="blue-grey-1"
                text-color="grey"
                icon="fa-solid fa-user"
                size="md"
                class="q-ml-sm"
              />
              <div class="q-ml-md">
                <div class="text-primary text-weight-medium" style="font-size: 16px">
                  {{ contacto.row.Telefono }}
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
            <div
              v-if="contacto.row.CampoPersonalizado && contacto.row.CampoPersonalizado.length > 0"
            >
              <q-separator class="q-my-md" />

              <q-card-section class="q-pt-none q-px-md">
                <div
                  v-for="CampoPersonalizado in contacto.row.CampoPersonalizado"
                  :key="CampoPersonalizado.id"
                  class="row justify-between fit q-mb-sm"
                  style="font-size: 14px"
                >
                  <div class="text-grey-7">{{ CampoPersonalizado.Nombre }}</div>
                  <div class="text-grey-9 ellipsis">{{ CampoPersonalizado.Valor }}</div>
                </div>
              </q-card-section>

              <q-space />

              <q-card-section class="row items-center q-pt-none">
                <q-chip
                  outline
                  square
                  color="grey-7"
                  size="sm"
                  :label="contacto.row.CampoPersonalizado?.length + ' campos'"
                />
                <q-space />
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
import type { ComputedRef } from 'vue';
import { ref, computed, watch } from 'vue';
import { useContactoStore } from 'src/stores/contacto.store';
import { type Contacto } from 'src/types/contacto';
import { type CampoPersonalizadoContacto } from 'src/types/campopersonalizadocontacto';
import type { ContactosSeleccionados } from 'src/types/contactosSeleccionados';

const contactoStore = useContactoStore();
const searchText = ref('');

interface LocalContactoSeleccionado {
  componentePadre: string;
  contactoSeleccionado?: ContactosSeleccionados;
}

const props = defineProps<LocalContactoSeleccionado>();

const emit = defineEmits(['update:contactoSeleccionado']);

const contactosSeleccionadosExistentes = computed(
  () => props.contactoSeleccionado?.contactosSeleccionados || ([] as Contacto[]),
);

const selectedContacts = ref<Contacto[]>(contactosSeleccionadosExistentes.value);

const contactos: ComputedRef<Contacto[]> = computed(() => contactoStore.contactos);

const pagination = ref({
  page: contactoStore.pagina,
  rowsPerPage: contactoStore.tamano,
});

interface Columnas {
  name: string;
  label: string;
  field: string | ((row: Contacto) => string);
}

const columnas: Columnas[] = [
  { name: 'Telefono', label: 'Telefono', field: 'Telefono' },
  {
    name: 'Nombre',
    label: 'nombre',
    field: (row: Contacto): string =>
      row.CampoPersonalizado && row.CampoPersonalizado.length > 0
        ? row.CampoPersonalizado.map((f: CampoPersonalizadoContacto) => f.Nombre).join(' ')
        : '',
  },
  {
    name: 'Valor',
    label: 'valor',
    field: (row: Contacto) =>
      row.CampoPersonalizado && row.CampoPersonalizado.length > 0
        ? row.CampoPersonalizado.map((f: CampoPersonalizadoContacto) => f.Valor).join(' ')
        : '',
  },
];

watch(
  selectedContacts,
  (newVal) => {
    emit('update:contactoSeleccionado', { contactosSeleccionados: newVal });
  },
  { deep: true },
);
</script>

<style>
.transition-card-contacto {
  transition:
    transform 0.28s,
    background-color 0.28s !important;
}

.card-contacto:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  border-color: #86b3ef !important;
}
</style>

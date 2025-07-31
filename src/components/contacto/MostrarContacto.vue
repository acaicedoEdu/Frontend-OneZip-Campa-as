<template>
  <div class="q-pa-md q-pa-lg-lg">
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Contactos Individuales</div>
        <div class="text-grey-8">{{ contactos.length }} contactos con campos personalizables</div>
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
        v-if="contactos.length > 0"
      >
        <q-icon name="fa-solid fa-user-plus" size="15px" class="text-grey-9" />
        <span class="text-weight-bold q-ml-sm text-grey-9">Añadir Contacto</span>
      </q-btn>
    </div>
    <q-table
      :rows="contactos"
      :columns="columnas"
      row-key="telefono"
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
            <q-card-section
              :class="
                props.row.campoPersonalizado && props.row.campoPersonalizado.length > 0
                  ? 'row items-center no-wrap q-pb-none'
                  : 'row items-center no-wrap q-pb-md'
              "
            >
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
                  {{ props.row.telefono }}
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
            <div v-if="props.row.campoPersonalizado && props.row.campoPersonalizado.length > 0">
              <q-separator class="q-my-md" />

              <q-card-section class="q-pt-none q-px-md">
                <div
                  v-for="campoPersonalizado in props.row.campoPersonalizado"
                  :key="campoPersonalizado.id"
                  class="row fit q-mb-sm"
                  style="font-size: 14px"
                >
                  <div class="col-4 text-grey-7">{{ campoPersonalizado.nombre }}</div>
                  <div class="col-8 text-grey-9 ellipsis">{{ campoPersonalizado.valor }}</div>
                </div>
              </q-card-section>

              <q-space />

              <q-card-section class="row items-center q-pt-none">
                <q-chip
                  outline
                  square
                  color="grey-7"
                  size="sm"
                  :label="props.row.campoPersonalizado?.length + ' campos'"
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

const contactos: ComputedRef<Contacto[]> = computed(() => [
  {
    telefono: '123456789',
    campoPersonalizado: [
      { nombre: 'Nombre', valor: 'Juan' },
      { nombre: 'Apellido', valor: 'Perez' },
    ],
  },
  {
    telefono: '987654321',
    campoPersonalizado: [
      { nombre: 'Nombre', valor: 'Pedro' },
      { nombre: 'Apellido', valor: 'Garcia' },
    ],
  },
  {
    telefono: '123456785',
  },
]);
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
  { name: 'Telefono', label: 'telefono', field: 'telefono' },
  {
    name: 'Nombre',
    label: 'nombre',
    field: (row: Contacto): string =>
      row.campoPersonalizado && row.campoPersonalizado.length > 0
        ? row.campoPersonalizado.map((f: CampoPersonalizadoContacto) => f.nombre).join(' ')
        : '',
  },
  {
    name: 'Valor',
    label: 'valor',
    field: (row: Contacto) =>
      row.campoPersonalizado && row.campoPersonalizado.length > 0
        ? row.campoPersonalizado.map((f: CampoPersonalizadoContacto) => f.valor).join(' ')
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

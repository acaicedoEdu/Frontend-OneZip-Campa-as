<template>
  <div class="q-pa-md q-pa-lg-lg">
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">Contactos Individuales</div>
        <div class="text-grey-8">{{ rows.length }} contactos sin grupo asignado</div>
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
        <template v-slot:prepend>
          <q-icon name="fa-solid fa-magnifying-glass" size="18px" />
        </template>
      </q-input>
      <q-btn
        class="flex items-center justify-center boton-importar-contactos"
        unelevated
        outline
        no-caps
        default
      >
        <q-icon name="fa-solid fa-folder-plus" size="13px" class="text-dark" />
        <span class="text-weight-regular q-ml-sm text-dark">Añadir a Grupo</span>
      </q-btn>
    </div>

    <q-table
      :rows="rows"
      row-key="email"
      selection="multiple"
      v-model:selected="selected"
      flat
      bordered
      :hide-bottom="true"
      :table-header-style="{ fontWeight: 'normal', fontSize: '15px' }"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props" style="width: 30%">
          <div class="text-weight-bold">{{ props.row.name }}</div>
          <div class="text-caption text-grey">Añadido: {{ props.row.addedDate }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
          <q-btn flat round dense icon="o_edit" color="primary" />
          <q-btn flat round dense icon="o_delete" color="negative" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchText = ref('');
const selected = ref([]);

const rows = ref([
  {
    name: 'Ana Rodríguez',
    addedDate: '2024-01-14',
    phone: '+34 600 111 222',
    email: 'ana.rodriguez@email.com',
    lastContact: '2024-01-15',
  },
  {
    name: 'Pedro Martínez',
    addedDate: '2024-01-13',
    phone: '+34 600 333 444',
    email: 'pedro.martinez@email.com',
    lastContact: '2024-01-14',
  },
  {
    name: 'Laura Sánchez',
    addedDate: '2024-01-12',
    phone: '+34 600 555 666',
    email: 'laura.sanchez@email.com',
    lastContact: '2024-01-15',
  },
]);
</script>

<style>
.boton-importar-contactos {
  color: #e5e7eb;
  padding: 8px 16px;
}

.boton-importar-contactos:hover {
  background-color: #f4f4f5 !important;
}
</style>

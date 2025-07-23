<template>
  <div class="q-pa-md q-pa-lg-lg">

    <div class="row items-center q-mb-md">
      <q-icon name="o_person_outline" size="md" class="q-mr-md" />
      <div>
        <div class="text-h5 text-weight-bold">Contactos Individuales</div>
        <div class="text-grey-8">{{ rows.length }} contactos sin grupo asignado</div>
      </div>

      <q-space />

      <q-input
        outlined
        dense
        rounded
        v-model="searchText"
        placeholder="Buscar contactos..."
        class="q-mr-sm"
        style="width: 250px;"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn outline round dense color="grey-8" icon="o_filter_alt" class="q-mr-md" />
      <q-btn
        outline
        no-caps
        rounded
        color="grey-9"
        icon="o_add_circle_outline"
        label="Añadir a Grupo"
        style="font-weight: 500;"
      />
    </div>

    <q-table
      :rows="rows"
      :columns="columns"
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

<script setup>
import { ref } from 'vue'

const searchText = ref('')
const selected = ref([]) // Almacenará las filas que el usuario seleccione

// Definición de las columnas de la tabla.
// Esto le dice a q-table qué mostrar y cómo alinearlo.
const columns = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left', sortable: true },
  { name: 'phone', label: 'Teléfono', field: 'phone', align: 'left' },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'lastContact', label: 'Último Contacto', field: 'lastContact', align: 'left', sortable: true },
  { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
]

// Datos de ejemplo. En una app real, esto vendría de una API.
const rows = ref([
  { name: 'Ana Rodríguez', addedDate: '2024-01-14', phone: '+34 600 111 222', email: 'ana.rodriguez@email.com', lastContact: '2024-01-15' },
  { name: 'Pedro Martínez', addedDate: '2024-01-13', phone: '+34 600 333 444', email: 'pedro.martinez@email.com', lastContact: '2024-01-14' },
  { name: 'Laura Sánchez', addedDate: '2024-01-12', phone: '+34 600 555 666', email: 'laura.sanchez@email.com', lastContact: '2024-01-15' },
])
</script>

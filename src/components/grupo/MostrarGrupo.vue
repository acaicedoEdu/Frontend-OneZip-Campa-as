<template>
  <div class="q-pa-md q-pa-lg-lg">

    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Grupos de Contactos</div>
        <div class="text-grey-8">{{ groups.length }} grupos disponibles</div>
      </div>

      <q-space />

      <q-input
        outlined
        dense
        rounded
        v-model="searchText"
        placeholder="Buscar grupos..."
        class="q-mr-sm"
        style="width: 250px;"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-btn flat round color="grey-8" icon="o_filter_alt" />
    </div>

    <div class="row q-col-gutter-lg">

      <div
        v-for="group in groups"
        :key="group.title"
        class="col-12 col-md-6 col-lg-4"
      >
        <q-card flat bordered class="full-height cursor-pointer">

          <q-card-section class="row items-center no-wrap">
            <q-icon name="o_folder" color="green" size="sm" class="q-mr-sm" />
            <div class="text-weight-bold ellipsis">{{ group.title }}</div>
            <q-space />
            <q-btn flat round dense icon="more_vert" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-chip
              square
              :color="group.color"
              text-color="white"
              :label="group.contacts + ' contactos'"
            />
            <div class="q-mt-md">{{ group.description }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="text-caption text-grey">
            <div>Creado: {{ group.created }}</div>
            <div>Actualizado: {{ group.updated }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchText = ref('')

// Array de datos. En una aplicación real, esto vendría de una API.
const groups = ref([
  {
    title: 'Clientes VIP',
    contacts: 45,
    color: 'deep-purple-5',
    description: 'Clientes con mayor valor',
    created: '2024-01-10',
    updated: '2024-01-15',
  },
  {
    title: 'Madrid',
    contacts: 128,
    color: 'light-blue-6',
    description: 'Contactos de Madrid',
    created: '2024-01-08',
    updated: '2024-01-14',
  },
  {
    title: 'Nuevos Clientes',
    contacts: 67,
    color: 'green-6',
    description: 'Clientes registrados este mes',
    created: '2024-01-12',
    updated: '2024-01-15',
  },
  {
    title: 'Empresas',
    contacts: 23,
    color: 'orange-7',
    description: 'Contactos corporativos',
    created: '2024-01-09',
    updated: '2024-01-13',
  },
])
</script>

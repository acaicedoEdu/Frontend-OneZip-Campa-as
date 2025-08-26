<template>
  <q-page>
    <div class="q-pa-md">
      <!-- <div v-if="plantillaStore.plantillas.length === 0">
        <q-spinner-oval v-if="plantillaStore.loading" color="primary" size="4em" />
        <VacioDatos v-else pagina="plantilla" />
      </div> -->
      <div class="row items-center q-mb-lg">
        <div>
          <div class="text-h5 text-weight-bold">Todas las plantillas</div>
          <div class="text-grey-8">
            {{ plantillaStore.plantillas.length }} plantillas disponibles
          </div>
        </div>

        <q-space />

        <q-input
          outlined
          dense
          v-model="searchText"
          placeholder="Buscar plantillas..."
          style="width: 250px"
        >
          <template v-slot:prepend>
            <q-icon name="fa-solid fa-magnifying-glass" size="18px" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { usePlantillaStore } from 'src/stores/plantilla.store';
// import VacioDatos from 'src/components/VacioDatos.vue';
// import MostrarPlantilla from 'src/components/plantilla/MostrarPlantilla.vue';

const plantillaStore = usePlantillaStore();
const searchText = ref('');
</script>

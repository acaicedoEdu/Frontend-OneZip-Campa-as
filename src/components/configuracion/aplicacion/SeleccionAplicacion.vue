<template>
  <q-select
    class="bg-white"
    outlined
    dense
    v-model="modelAplicacion"
    label="Aplicación"
    dropdown-icon="fa-solid fa-chevron-down"
    :options="opcionesAplicacion"
    style="width: 250px"
    :loading="aplicacionStore.loading"
    options-dense
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { useAplicacionStore } from 'src/stores/aplicacion.store';
import { computed, ref, watch, onMounted } from 'vue';

const modelAplicacion = ref();
const aplicacionStore = useAplicacionStore();

onMounted(async () => {
  try {
    await aplicacionStore.fetchAplicaciones();
    if (aplicacionStore.aplicaciones.length > 0) {
      aplicacionStore.IdAplicacionEscogida = aplicacionStore.aplicaciones[0]!.IdAplicacion;
    }
  } catch (error) {
    console.error('Error al cargar aplicaciones', error);
  }
});

const opcionesAplicacion = computed(() => {
  return aplicacionStore.aplicaciones.map((app) => ({
    label: app.Nombre,
    value: app.IdAplicacion,
  }));
});

watch(
  modelAplicacion,
  (newAppId) => {
    if (newAppId) {
      aplicacionStore.setIdAplicacionEscogida(newAppId);
    }
  },
  { immediate: true },
);
</script>

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
        <q-item-section class="text-grey"> No tienes aplicaciones </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { useAplicacionStore } from 'src/stores/aplicacion.store';
import { computed, ref, watch } from 'vue';

const aplicacionStore = useAplicacionStore();

const aplicacionEscogida = computed(() => {
  const app = aplicacionStore.aplicaciones.find(
    (app) => app.IdAplicacion === aplicacionStore.IdAplicacionEscogida,
  );
  if (app) {
    return {
      label: app.Nombre,
      value: app.IdAplicacion,
    };
  }
  return null;
});

const modelAplicacion = ref(aplicacionEscogida);

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
      aplicacionStore.setIdAplicacionEscogida(newAppId.value);
    }
  },
  { immediate: true },
);
</script>

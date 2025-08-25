<template>
  <q-select
    class="bg-white"
    outlined
    dense
    v-model="aplicacionEscogida"
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
const IdAplicacionEscogida = computed(() => aplicacionStore.IdAplicacionEscogida);

const aplicacionEscogida = ref(
  aplicacionStore.aplicaciones.find((app) => app.IdAplicacion == IdAplicacionEscogida.value)
    ?.Nombre,
);

const opcionesAplicacion = computed(() => {
  return aplicacionStore.aplicaciones.map((app) => app.Nombre);
});

watch(aplicacionEscogida, (newValue) => {
  if (newValue) {
    aplicacionStore.setIdAplicacionEscogida(
      aplicacionStore.aplicaciones.find((app) => app.Nombre === newValue)?.IdAplicacion || 0,
    );
  }
});

watch(IdAplicacionEscogida, (newValue) => {
  if (newValue) {
    aplicacionEscogida.value = aplicacionStore.aplicaciones.find(
      (app) => app.IdAplicacion == newValue,
    )?.Nombre;
  }
});
</script>

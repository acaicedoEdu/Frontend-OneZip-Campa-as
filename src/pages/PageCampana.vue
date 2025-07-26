<template>
  <q-page>
    <div v-if="aplicacionStore.aplicaciones.length === 0">
      <div v-if="aplicacionStore.loading" class="flex flex-center" style="height: 80vh">
        <q-spinner-oval color="primary" size="4em" />
      </div>
      <VacioDatos v-else pagina="aplicacion" />
    </div>
    <div v-else>
      <SeleccionAplicacion />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';
import SeleccionAplicacion from 'src/components/configuracion/aplicacion/SeleccionAplicacion.vue';
import VacioDatos from 'src/components/VacioDatos.vue';
import { useAplicacionStore } from 'src/stores/aplicacion.store';

const aplicacionStore = useAplicacionStore();
const IdAplicacionEscogida: Ref<number> = ref(aplicacionStore.IdAplicacionEscogida);

watch(
  IdAplicacionEscogida,
  (newAppId) => {
    if (newAppId) {
      console.log('Holaaaaaa');
    }
  },
  { immediate: true },
);
</script>

<template>
  <q-page>
    <div v-if="aplicacionStore.aplicaciones.length === 0">
      <div v-if="aplicacionStore.loading" class="flex flex-center" style="height: 80vh">
        <q-spinner-oval color="primary" size="4em" />
      </div>
      <VacioDatos v-else pagina="aplicacion" />
    </div>
    <div class="q-pl-md" v-else>
      <SeleccionAplicacion />
    </div>
    <MostrarCampana v-if="aplicacionStore.aplicaciones.length > 0" />
  </q-page>
</template>

<script setup lang="ts">
import { type Ref, ref, watch, onMounted } from 'vue';
import SeleccionAplicacion from 'src/components/configuracion/aplicacion/SeleccionAplicacion.vue';
import VacioDatos from 'src/components/VacioDatos.vue';
import { useAplicacionStore } from 'src/stores/aplicacion.store';
import MostrarCampana from 'src/components/campana/MostrarCampana.vue';

const aplicacionStore = useAplicacionStore();
const IdAplicacionEscogida: Ref<number> = ref(aplicacionStore.IdAplicacionEscogida);

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

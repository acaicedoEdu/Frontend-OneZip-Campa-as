<template>
  <q-page>
    <div v-if="aplicacionStore.aplicaciones.length === 0">
      <div v-if="aplicacionStore.loading" class="flex flex-center" style="height: 80vh">
        <q-spinner-oval color="primary" size="4em" />
      </div>
      <VacioDatos v-else pagina="aplicacion" />
    </div>
    <div v-else class="q-pl-md">
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
import { useCampanaStore } from 'src/stores/campana.store';
import MostrarCampana from 'src/components/campana/MostrarCampana.vue';

const aplicacionStore = useAplicacionStore();
const campanaStore = useCampanaStore();
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
  async (newAppId) => {
    if (newAppId) {
      await campanaStore.fetchcampanasXAplicacion(newAppId);
    }
  },
  { immediate: true },
);
</script>
